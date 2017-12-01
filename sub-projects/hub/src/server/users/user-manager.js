const userModels = require('users/user-models');

const errors = require('resources/errors.js');
const mailer = require('utils/mailer.js');
const dbUtils = require('utils/db.js');

const Admin = userModels.Admin;

async function createAdmin(data) {
  try {
    // Ensure the required data is available.
    if (!data) {
      throw new errors.MissingParametersError();
    }

    const newPass = await dbUtils.genRandom(20);

    const info = {
      email: data.email,
      password: newPass,
    };

    const admin = new Admin(info);

    const existing = await Admin.findOne({ email: admin.email }).exec();

    if (existing) {
      throw new errors.ExistingAccountError();
    }

    const created = await admin.save();

    await mailer.sendCreatedAdmin(data.email, newPass);

    return created.id;
  } catch (err) {
    throw err;
  }
}

module.exports = { createAdmin };
