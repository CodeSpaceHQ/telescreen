const {
  Token,
  Refresh,
  Code,
} = require('./oauth-models.js');
const logger = require('utils/logger.js');

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
      .findOne({ refresh: token.refresh })
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

async function getAuthorizationCode() {

}

async function getClient() {

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
