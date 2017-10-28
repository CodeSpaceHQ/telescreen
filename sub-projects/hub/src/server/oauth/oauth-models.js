const mongoose = require('mongoose');

const values = require('resources/values.js');
const dbUtils = require('utils/db.js');
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
  let id;
  let client;

  try {
    for (let i = 0; i < values.maxRetries; i += 1) {
      /* eslint-disable no-await-in-loop */
      id = await dbUtils.genRandom(25);

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
