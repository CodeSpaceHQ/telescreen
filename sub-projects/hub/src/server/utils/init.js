const Admin = require('users/user-models').Admin;

async function initialize() {
  try {
    const result = await Admin.findOne({}).exec();

    if (result) {
      return;
    }

    // TODO(NilsG-S): Read from input
    const email = 'test@ttu.edu';
    const password = 'testing';

    const info = {
      email,
      password,
    };

    const user = new Admin(info);

    await user.save();
  } catch (err) {
    throw err;
  }
}

module.exports = {
  initialize,
};
