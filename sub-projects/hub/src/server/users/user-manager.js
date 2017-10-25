const userModels = require('users/user-models');
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
    console.log("TestAdmin");
    user = new Admin(info);
  } else {
    next({ err: 'Valid role not found.' });
    return;
  }

  Admin.findOne({ email: user.email }, (userErr, existingUser) => {
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