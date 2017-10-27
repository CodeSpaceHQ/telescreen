const mongoose = require('mongoose');
const crypto = require('crypto');

const errors = require('resources/errors.js');

const clientSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

clientSchema.statics.genId = async function genId() {
  try {
    const id = await new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buf) => {
        if (err) {
          return reject(err);
        }

        return resolve(buf.toString('hex'));
      });
    });

    const client = await this.findOne({ id }).exec();

    if (client) {
      throw new errors.NonUniqueIDError();
    }

    return id;
  } catch (err) {
    throw err;
  }
};

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
});

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
});

module.exports = {
  Client: mongoose.model('Client', clientSchema),
  Token: mongoose.model('Token', tokenSchema),
  Code: mongoose.model('Code', codeSchema),
};
