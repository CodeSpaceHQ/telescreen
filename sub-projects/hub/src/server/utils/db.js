const Admin = require('users/user-models').Admin;

async function initialize() {
  try {
    const result = await Admin.findOne({}).exec();

    if (result) {
      return;
    }

    const info = {
      email: process.env.INIT_USERNAME,
      password: process.env.INIT_PASSWORD,
    };

    const user = new Admin(info);

    await new Promise((resolve, reject) => {
      user.save((err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      });
    });
  } catch (err) {
    throw err;
  }
}

async function reset() {
  const admin = Admin.deleteMany({}).exec();
  await admin;
}

module.exports = {
  initialize,
  reset,
};
