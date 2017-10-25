const passport = require('passport-config.js');

const authErrors = require('resources/errors.js');

/**
 * Given a valid email/password, generates a session and returns the id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object, Error>} - Resolves with the user and expiration,
 * or rejects with an error that contains a status code and a message.
 */
const login = async (req, res) => {
  try {
    const rawUser = await new Promise((resolve, reject) => {
      // Arguments come from passport-config.js callback.
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          reject(new (authErrors.errorFactory(err.message, 400))());
          return;
        }

        if (!user) {
          reject(new (authErrors.errorFactory(info.message, 401))());
          return;
        }

        req.logIn(user, (authErr) => {
          if (authErr) {
            reject(new (authErrors.errorFactory(authErr.message, 400))());
            return;
          }

          resolve(user);
        });
      })(req, res);
    });

    const output = {
      user: {
        uid: rawUser.id,
        email: rawUser.email,
      },
      expires: req.session.cookie.expires,
    };

    return output;
  } catch (err) {
    throw err;
  }
};

/**
 * Delete a specific session from the database.
 * @param {Object} session - The client's session.
 * @returns {Promise<undefined, Error>} - Resolves, or rejects with an error.
 */
const logout = async (session) => {
  try {
    await new Promise((resolve, reject) => {
      // Delete the session from the DB.
      session.destroy((err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Middleware to determine whether the session is verified.
 * For valid sessions, the next middleware is called.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - Invoke the next middleware or route.
 */
const verify = (req, res, next) => {
  // No user was retrieved, so no valid session exists. Inform the client.
  if (!req.user) {
    const message = new authErrors.InvalidSessionError().message;
    // Prevent execution of later middleware for efficiency and clarity.
    res.status(400).json({ message }).end();
    return;
  }

  next();
};

module.exports = {
  login,
  logout,
  verify,
};
