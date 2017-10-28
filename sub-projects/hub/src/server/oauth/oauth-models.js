const mongoose = require('mongoose');

const values = require('resources/values.js');
const dbUtils = require('utils/db.js');
const errors = require('resources/errors.js');

async function genUnique(len) {
  let id;
  let client;

  try {
    for (let i = 0; i < values.maxRetries; i += 1) {
      /* eslint-disable no-await-in-loop */
      id = await dbUtils.genRandom(len);

      client = await this.findOne({ id }).exec();
      /* eslint-enable no-await-in-loop */

      if (!client) {
        return id;
      }
    }

    throw new errors.MaxRetriesError();
  } catch (err) {
    throw err;
  }
}

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
  return genUnique.bind(this)(25);
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

clientSchema.statics.genToken = async function genToken() {
  return genUnique.bind(this)(32);
};

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

clientSchema.statics.genCode = async function genCode() {
  return genUnique.bind(this)(25);
};

module.exports = {
  Client: mongoose.model('Client', clientSchema),
  Token: mongoose.model('Token', tokenSchema),
  Code: mongoose.model('Code', codeSchema),
};
