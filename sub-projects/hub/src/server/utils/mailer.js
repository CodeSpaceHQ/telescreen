const mailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendCreatedAdmin(email, password) {
  const body =
    `Your temporary password is: ${password}\n\n` +
    'Please change it as soon as possible!';

  const mailOptions = {
    // sender address
    from: '\'Telescreen\' <inner.party.telescreen@gmail.com@gmail.com>',
    // list of receivers
    to: email,
    // Subject line
    subject: 'Your New Account',
    // plain text body
    text: body,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  sendCreatedAdmin,
};
