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

router.post('/client', (req, res) => {
  oauthManager.createClient(req.body.redirectURL, req.body.name)
    .then((clientId) => {
      res.status(200).json({ clientId }).end();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message }).end();
    });
});

router.post('/token', (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  oauth.token(req, res)
    .then((stuff) => {
      response.status(200).json({ stuff }).end();
    })
    .catch((stuff) => {
      response.status(400).json({ stuff }).end();
    });
});

/**
 * As a user, create an authorization code for a specific client.
 * 
 * #### Request
 * 
 * - path: `/api/auth`
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
