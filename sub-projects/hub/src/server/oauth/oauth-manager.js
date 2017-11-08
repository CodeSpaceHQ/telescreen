/* eslint-disable no-underscore-dangle */

const {
  Token,
  Refresh,
  Code,
} = require('./oauth-models.js');
const logger = require('utils/logger.js');
const errors = require('resources/errors.js');

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

    const authCode = await Refresh
      .findOne({ code })
      .populate('Client')
      .exec();

    if (!authCode) {
      output = false;
    } else {
      output = {
        code,
        expiresAt: authCode.expires,
        client: authCode.Client,
        redirectUri: authCode.Client.redirectURL,
      };
    }

    return output;
  } catch (err) {
    throw err;
  }
}

async function getClient(clientId) {
  logger.info('Getting authorization code.');

  try {
    const client = await Refresh
      .findById(clientId)
      .populate('Client')
      .exec();

    if (!client) {
      throw new errors.ClientNotFoundError();
    }

    return {
      id: client._id,
      redirectUris: [client.redirectURL],
    };
  } catch (err) {
    throw err;
  }
}

async function saveToken(token, client) {
  logger.info('Saving token.');

  try {
    const tokenString = Token.genToken();
    let refreshString;
    if (token.refreshToken) {
      refreshString = Refresh.genRefresh();
    }

    const tokenPromise = new Token({
      token: await tokenString,
      expires: token.accessTokenExpiresAt,
      Client: client._id,
    }).save();
    let refreshPromise;
    if (token.refreshToken) {
      refreshPromise = new Refresh({
        refresh: await refreshString,
        expires: token.refreshTokenExpiresAt,
        Client: client._id,
      }).save();
    }

    await tokenPromise;
    if (token.refreshToken) {
      await refreshPromise;
    }

    return {
      client,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  } catch (err) {
    throw err;
  }
}

async function saveAuthorizationCode(code, client) {
  logger.info('Saving auth code.');

  try {
    const tokenString = Code.genCode();

    const tokenPromise = new Token({
      token: await tokenString,
      expires: code.expiresAt,
      Client: client._id,
    }).save();

    await tokenPromise;

    return code;
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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode,
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  saveToken,
  saveAuthorizationCode,
  revokeToken,
  revokeAuthorizationCode,
};
