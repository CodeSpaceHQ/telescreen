/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const OAuth2Server = require('oauth2-server');

const {
  Client,
  Token,
  Refresh,
  Code,
} = require('./oauth-models.js');
const logger = require('utils/logger.js');
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
    const access = await Token
      .findOne({ token })
      .populate('Client')
      .exec();

    if (!access) {
      return false;
    }

    return {
      accessToken: token,
      accessTokenExpiresAt: access.expires,
      scope: access.Client.scope,
      client: {
        id: access.Client._id.toString(),
      },
      user: access.Client.user ? access.Client.user : {},
    };
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

    if (!refresh) {
      return false;
    }

    // `refreshTokenExpiresAt: null` results in a non-expiring token.
    return {
      refreshToken: token,
      refreshTokenExpiresAt: null,
      scope: refresh.Client.scope,
      client: {
        id: refresh.Client._id.toString(),
      },
      user: refresh.Client.user ? refresh.Client.user : {},
    };
  } catch (err) {
    throw err;
  }
}

async function getAuthorizationCode(code) {
  logger.info('Getting authorization code.');

  try {
    const auth = await Code
      .findOne({ code })
      .populate('Client')
      .exec();

    if (!auth) {
      return false;
    }

    return {
      code,
      expiresAt: auth.expires,
      redirectUri: auth.Client.redirectURL,
      scope: auth.Client.scope,
      client: {
        id: auth.Client._id.toString(),
      },
      user: auth.Client.user ? auth.Client.user : {},
    };
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
      return false;
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

async function saveToken(token, client, user) {
  logger.info('Saving token.');

  try {
    const tokenPromise = new Token({
      token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      Client: mongoose.Types.ObjectId(client.id),
    }).save();

    if (token.refreshToken) {
      await new Refresh({
        refresh: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        Client: mongoose.Types.ObjectId(client.id),
      }).save();
    }

    await tokenPromise;

    // `user` comes from various `get` methods in the OAuth server model.
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: {
        id: client.id,
      },
      user: {
        email: user.email,
      },
    };
  } catch (err) {
    throw err;
  }
}

async function saveAuthorizationCode(code, client, user) {
  logger.info('Saving auth code.');

  try {
    await new Code({
      code: code.authorizationCode,
      expires: code.expiresAt,
      Client: mongoose.Types.ObjectId(client.id),
    }).save();

    // `user` comes from the authentication handler.
    return {
      ...code,
      client: {
        id: client.id,
      },
      user: {
        email: user.email,
      },
    };
  } catch (err) {
    throw err;
  }
}

async function revokeToken(token) {
  logger.info('Revoking token.');

  try {
    const refresh = await Refresh
      .findOneAndRemove({ refresh: token.refreshToken })
      .exec();

    if (!refresh) {
      return false;
    }

    return true;
  } catch (err) {
    throw err;
  }
}

async function revokeAuthorizationCode(code) {
  logger.info('Revoking authorization code.');

  try {
    const auth = Code
      .findOneAndRemove({ code: code.code })
      .exec();

    if (!auth) {
      return false;
    }

    return true;
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
  server: new OAuth2Server({
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
    requireClientAuthentication: {
      authorization_code: false,
      refresh_token: false,
      password: false,
    },
    alwaysIssueNewRefreshToken: false,
  }),
  createClient,
};
