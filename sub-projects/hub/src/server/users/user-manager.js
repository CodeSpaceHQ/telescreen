const userModels = require('users/user-models');

const errors = require('resources/errors.js');

const Admin = userModels.Admin;

async function createAdmin(data) {
  try {
    // Ensure the required data is available.
    if (!data) {
      throw new errors.MissingParametersError();
    }

    const info = {
      email: data.email,
      password: data.password,
    };

    const admin = new Admin(info);

    const existing = await Admin.findOne({ email: admin.email }).exec();

    if (existing) {
      throw new errors.ExistingAccountError();
    }

    const created = await admin.save();

    return created.id;
  } catch (err) {
    throw err;
  }
}

module.exports = { createAdmin };
