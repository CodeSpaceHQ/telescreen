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
    const authCode = await Refresh
      .findOne({ code })
      .populate('Client')
      .exec();

    return {
      code,
      expiresAt: authCode.expires,
      client: authCode.Client,
      redirectUri: authCode.Client.redirectURL,
    };
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

async function saveToken() {

}

async function saveAuthorizationCode() {

}

async function revokeToken() {

}

async function revokeAuthorizationCode() {

}

async function validateScope() {

}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  saveToken,
  saveAuthorizationCode,
  revokeToken,
  revokeAuthorizationCode,
  validateScope,
};
