/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const {
  Client,
  Token,
  Refresh,
  Code,
} = require('./oauth-models.js');
const logger = require('utils/logger.js');
const errors = require('resources/errors.js');
const userModels = require('users/user-models');

const Admin = userModels.Admin;

// OAuth2 Server Model

async function generateAccessToken() {
  logger.info('Generating access token.');

  return Token.genToken();
}

async function generateRefreshToken() {
  logger.info('Generating refresh token.');

  return Refresh.genRefresh();
}

async function generateAuthorizationCode() {
  logger.info('Generating authorization code.');

  return Code.genCode();
}

async function getAccessToken(token) {
  logger.info('Getting access token.');

  try {
    let output = false;
    const access = Token
      .findOne({ token })
      .populate('Client')
      .exec();

    if (access) {
      output = {
        accessToken: token,
        client: access.Client,
      };
    }

    return output;
  } catch (err) {
    throw err;
  }
}

async function getRefreshToken(token) {
  logger.info('Getting refresh token.');

  try {
    const refresh = await Refresh
      .findOne({ refresh: token })
      .populate('Client')
      .exec();

    return {
      refreshToken: token,
      client: refresh.Client,
    };
  } catch (err) {
    throw err;
  }
}

async function getAuthorizationCode(code) {
  logger.info('Getting authorization code.');

  try {
    let output;

    const authCode = await Code
      .findOne({ code })
      .populate('Client')
      .exec();

    if (!authCode) {
      output = false;
    } else {
      output = {
        code,
        expiresAt: authCode.expires,
        client: {
          id: authCode.Client._id.toString(),
        },
        redirectUri: authCode.Client.redirectURL,
        user: {},
      };
    }

    return output;
  } catch (err) {
    throw err;
  }
}

async function getClient(clientId) {
  logger.info('Getting client.');

  try {
    const client = await Client
      .findById(clientId)
      .exec();

    if (!client) {
      throw new errors.ClientNotFoundError();
    }

    return {
      id: client._id.toString(),
      redirectUris: [client.redirectURL],
      grants: ['authorization_code', 'password', 'refresh_token'],
    };
  } catch (err) {
    throw err;
  }
}

async function getUser(email, password) {
  logger.info('Getting user.');

  try {
    const user = await Admin.findOne({ email }).exec();

    // No user found for the given email address.
    if (!user) {
      return false;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return false;
    }

    return user;
  } catch (err) {
    throw err;
  }
}

async function saveToken(token, client) {
  logger.info('Saving token.');

  try {
    const tokenPromise = new Token({
      token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      Client: mongoose.Types.ObjectId(client.id),
    }).save();
    let refreshPromise;
    if (token.refreshToken) {
      refreshPromise = new Refresh({
        refresh: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        Client: mongoose.Types.ObjectId(client.id),
      }).save();
    }

    await tokenPromise;
    if (token.refreshToken) {
      await refreshPromise;
    }

    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: {
        id: client.id,
      },
      user: {},
    };
  } catch (err) {
    throw err;
  }
}

async function saveAuthorizationCode(code, client) {
  logger.info('Saving auth code.');

  try {
    const codePromise = new Code({
      code: code.authorizationCode,
      expires: code.expiresAt,
      Client: mongoose.Types.ObjectId(client.id),
    }).save();

    await codePromise;

    return {
      ...code,
      client: {
        id: client.id,
      },
    };
  } catch (err) {
    throw err;
  }
}

async function revokeToken(token) {
  logger.info('Revoking token.');

  try {
    const refresh = Refresh.findOneAndRemove({ refresh: token.refresh }).exec();
    let output = false;

    if (refresh) {
      output = true;
    }

    return output;
  } catch (err) {
    throw err;
  }
}

async function revokeAuthorizationCode(code) {
  logger.info('Revoking authorization code.');

  try {
    const authCode = Code.findOneAndRemove({ code: code.code }).exec();
    let output = false;

    if (authCode) {
      output = true;
    }

    return output;
  } catch (err) {
    throw err;
  }
}

// Other functionality

async function createClient(redirectURL, name) {
  logger.info('Creating client.');

  try {
    const client = await new Client({
      redirectURL,
      name,
    }).save();

    return client._id;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  model: {
    generateAccessToken,
    generateRefreshToken,
    generateAuthorizationCode,
    getAccessToken,
    getRefreshToken,
    getAuthorizationCode,
    getClient,
    getUser,
    saveToken,
    saveAuthorizationCode,
    revokeToken,
    revokeAuthorizationCode,
  },
  createClient,
};
