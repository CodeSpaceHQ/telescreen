const crypto = require('crypto');

async function genRandom(len) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(Math.ceil(len / 2), (err, buf) => {
      if (err) {
        return reject(err);
      }

      return resolve(buf.toString('hex'));
    });
  });
}

module.exports = {
  genRandom,
};
