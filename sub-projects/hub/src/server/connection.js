const mongoose = require('mongoose');
const mockgoose = require('mockgoose');

mongoose.Promise = global.Promise;
let mongoURL;
if (process.env.NODE_ENV === 'production') {
  mongoURL = process.env.PROD_MONGODB_URI;
} else {
  mongoURL = process.env.DEV_MONGODB_URI;
}

/**
 * Opens a connection from mongoose to the database, wrapping it with
 * mockgoose if `NODE_ENV` is 'test'.
 * @returns {Promise<undefined, Error>} - Resolves when connection is opened.
 */
function open() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'testing') {
      mockgoose(mongoose);
    }

    mongoose.connect(mongoURL, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

/**
 * Closes the connection from mongoose to the database, using `unmock` if
 * NODE_ENV is 'test'.
 * @returns {Promise<undefined, Error>} - Resolves when connection is closed.
 */
function close() {
  if (process.env.NODE_ENV === 'testing') {
    return new Promise((resolve) => {
      mongoose.unmock(() => {
        resolve();
      });
    });
  }

  return mongoose.disconnect();
}

module.exports = { open, close };
