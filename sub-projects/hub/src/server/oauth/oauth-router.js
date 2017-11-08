const express = require('express');
const OAuthServer = require('oauth2-server');

const oauthManager = require('./oauth-manager.js');

const oauth = new OAuthServer({
  model: oauthManager,
});

const Request = OAuthServer.Request;
const Response = OAuthServer.Response;
const router = express.Router();

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

router.post('/authorize', (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  oauth.authorize(req, res, {
    authenticateHandler: {
      handle: (rq) => {
        if (!rq.user) {
          return false;
        }

        return rq.user;
      },
    },
  })
    .then((stuff) => {
      response.status(200).json({ stuff }).end();
    })
    .catch((stuff) => {
      response.status(400).json({ stuff }).end();
    });
});

module.exports = { router };
