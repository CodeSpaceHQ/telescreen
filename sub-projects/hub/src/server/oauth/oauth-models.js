const mongoose = require('mongoose');

const values = require('resources/values.js');
const dbUtils = require('utils/db.js');
const errors = require('resources/errors.js');

const Schema = mongoose.Schema;

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

// Client

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
  email: {
    type: String,
  },
  name: {
    type: String,
  },
});

clientSchema.statics.genId = async function genId() {
  return genUnique.bind(this)(25);
};

// Refresh Token

const refreshSchema = new mongoose.Schema({
  refresh: {
    type: String,
    unique: true,
    required: true,
  },
  Client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
});

refreshSchema.statics.genRefresh = async function genRefresh() {
  return genUnique.bind(this)(40);
};

// Access Token

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: values.accessTokenLifetime,
  },
  expires: {
    type: Date,
    required: true,
  },
  Client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
});

tokenSchema.statics.genToken = async function genToken() {
  return genUnique.bind(this)(40);
};

// Authorization Code

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: values.authorizationCodeLifetime,
  },
  expires: {
    type: Date,
    required: true,
  },
  Client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
});

codeSchema.statics.genCode = async function genCode() {
  return genUnique.bind(this)(40);
};

module.exports = {
  Client: mongoose.model('Client', clientSchema),
  Token: mongoose.model('Token', tokenSchema),
  Refresh: mongoose.model('Refresh', refreshSchema),
  Code: mongoose.model('Code', codeSchema),
};
