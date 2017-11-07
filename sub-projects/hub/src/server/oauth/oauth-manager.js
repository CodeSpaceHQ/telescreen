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

    /* eslint-disable no-underscore-dangle */
    return {
      id: client._id,
      redirectUris: [client.redirectURL],
    };
    /* eslint-enable no-underscore-dangle */
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
    }).save();
    let refreshPromise;
    if (token.refreshToken) {
      refreshPromise = new Token({
        refresh: await refreshString,
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

async function saveAuthorizationCode() {

}

async function revokeToken() {

}

async function revokeAuthorizationCode() {

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
