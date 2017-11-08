const express = require('express');
const OAuthServer = require('oauth2-server');

const oauthManager = require('./oauth-manager.js');

const oauth = new OAuthServer({
  model: oauthManager.model,
});

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
 * As a client, exchange a code for a token.
 * 
 * #### Request
 * 
 * - path: `/api/oauth/token`
 * - verb: POST
 * - Content-Type: `application/x-www-form-urlencoded`
 * 
 * ```
 * client_id: String,
 * code: String,
 * grant_type: String,
 * redirect_uri: String
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
 *   "user": {}
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
 * 
 * ```json
 * {
 *   "client_id": String,
 *   "state": String,
 *   "response_type": String
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

  oauth.authorize(req, res, {
    authenticateHandler: {
      handle: rq => rq.user,
    },
  })
    .then((code) => {
      response.status(200).json(code).end();
    })
    .catch((err) => {
      response.status(400).json({ message: err.message }).end();
    });
});

module.exports = { router };
