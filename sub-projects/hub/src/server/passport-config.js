const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authErrors = require('./resources/errors.js');
const Admin = require('./users/user-models.js').Admin;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(email, password, done) => {
  let userStorage;

  Admin.findOne({ email }).exec()
    .catch((err) => {
      done(err);
    })
    .then((user) => {
      // No user found for the given email address.
      if (!user) {
        throw new authErrors.InvalidLoginInfoError();
      }

      userStorage = user;
      return user.comparePassword(password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        throw new authErrors.InvalidLoginInfoError();
      }

      done(null, userStorage);
    })
    .catch((err) => {
      done(null, false, { message: err.message });
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  Admin.findOne({ email }).exec()
    .catch((err) => {
      done(err, null);
    })
    .then((user) => {
      done(null, user);
    });
});

module.exports = passport;
