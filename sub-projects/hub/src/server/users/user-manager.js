const userModels = require('server/users/user-models');

const User = userModels.User;
const Admin = userModels.Admin;

const createUser = (data, next) => {
    // Ensure the required data is available.
    if (!data) {
      next({ err: 'Required parameters not found.' });
      return;
    }

const info = {
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role,
  };

  let user;

  if (data.role === 'admin') {
    // Create an admin.
    user = new Admin(info);
  } else {
    next({ err: 'Valid role not found.' });
    return;
  }

  User.findOne({ email: user.email }, (userErr, existingUser) => {
    if (userErr) {
      next(userErr);
    } else if (existingUser) {
      next({ err: 'Account with that email address already exists.' });
    } else {
      user.save((saveErr, dbUser) => {
        next(saveErr, (dbUser || {}).id);
      });
    }
  });
};

module.exports = { createUser};