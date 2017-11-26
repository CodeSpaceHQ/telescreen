const express = require('express');
const OAuthServer = require('oauth2-server');

const oauthManager = require('./oauth-manager.js');

const oauth = oauthManager.server;

const Request = OAuthServer.Request;
const Response = OAuthServer.Response;
const router = express.Router();

/**
 * @namespace OAuth2Endpoint
 */

/**
 * As a client, register yourself with the server.
 * 
 * #### Request
 * 
 * - path: `/api/oauth/client`
 * - verb: POST
 * 
 * ```json
 * {
 *   "redirectURL": String,
 *   "name": String
 * }
 * ```
 * 
 * #### Response
 * 
 * Status 200 - Success
 * 
 * ```json
 * {
 *   "clientId": String
 * }
 * ```
 * 
 * Status 400 - Failure
 * 
 * ```json
 * {
 *   "message": String
 * }
 * ```
 * 
 * @name client
 * @func
 * @memberOf OAuth2Endpoint
 */
router.post('/client', (req, res) => {
  oauthManager.createClient(req.body.redirectURL, req.body.name)
    .then((clientId) => {
      res.status(200).json({ clientId }).end();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message }).end();
    });
});

/**
 * Depending on request parameters:
 * 
 * 1. Exchange a code for tokens.
 * 2. Exchange username and password for tokens.
 * 3. Exchange a refresh token for new tokens when access token expires.
 * 
 * #### Request
 * 
 * - path: `/api/oauth/token`
 * - verb: POST
 * - Content-Type: `application/x-www-form-urlencoded`
 * 
 * 1:
 * 
 * ```
 * {
 *   "code": String,
 *   "grant_type": "authorization_code",
 *   "client_id": String,
 *   "redirect_uri": String
 * }
 * ```
 * 
 * 2:
 * 
 * ```json
 * {
 *   "username": String,
 *   "password": String,
 *   "grant_type": "password",
 *   "client_id": String,
 * }
 * ```
 * 
 * 3:
 * 
 * ```json
 * {
 *   "refresh_token": String,
 *   "grant_type": "refresh_token",
 *   "client_id": String,
 * }
 * ```
 * 
 * #### Response
 * 
 * Status 200 - Success
 * 
 * ```json
 * {
 *   "accessToken": String,
 *   "accessTokenExpiresAt": String,
 *   "refreshToken": String,
 *   "refreshTokenExpiresAt": String,
 *   "client": {
 *      "id": String
 *    },
 *   "user": {
 *     "email": String
 *   }
 * }
 * ```
 * 
 * Failure
 * 
 * ```json
 * {
 *   "code": Number,
 *   "message": String,
 *   "name": String
 * }
 * ```
 * 
 * @name token
 * @func
 * @memberOf OAuth2Endpoint
 */
router.post('/token', (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  oauth.token(req, res, {
    requireClientAuthentication: {
      authorization_code: false,
      refresh_token: false,
      password: false,
    },
  })
    .then((token) => {
      response.status(200).json(token).end();
    })
    .catch((err) => {
      response.status(err.code).json(err).end();
    });
});

/**
 * As a user, create an authorization code for a specific client.
 * 
 * #### Request
 * 
 * - path: `/api/oauth/authorize`
 * - verb: POST
 * - Content-Type: `application/x-www-form-urlencoded`
 * 
 * ```json
 * {
 *   "access_token": String,
 *   "state": String,
 *   "response_type": String,
 *   "client_id": String
 * }
 * ```
 * 
 * #### Response
 * 
 * Status 200 - Success
 * 
 * ```json
 * {
 *   "authorizationCode": String,
 *   "expiresAt": Date,
 *   "redirectUri": String,
 *   "client": {
 *     "id": String
 *   },
 *   "user": {
 *     "email": String
 *   }
 * }
 * ```
 * 
 * @name authorize
 * @func
 * @memberOf OAuth2Endpoint
 */
router.post('/authorize', (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  // Doesn't need an authenticate handler if you pass an access token.
  oauth.authorize(req, res)
    .then((code) => {
      response.status(200).json(code).end();
    })
    .catch((err) => {
      response.status(400).json(err).end();
    });
});

module.exports = { router };
