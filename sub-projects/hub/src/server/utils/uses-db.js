const {
  Client,
  Token,
  Refresh,
  Code,
} = require('oauth/oauth-models.js');
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
  const client = Client.deleteMany({}).exec();
  const token = Token.deleteMany({}).exec();
  const refresh = Refresh.deleteMany({}).exec();
  const code = Code.deleteMany({}).exec();
  await admin;
  await client;
  await token;
  await refresh;
  await code;
}

module.exports = {
  initialize,
  reset,
};
