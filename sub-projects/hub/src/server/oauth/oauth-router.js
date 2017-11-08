const express = require('express');
const OAuthServer = require('oauth2-server');

const oauthManager = require('./oauth-manager.js');

const oauth = new OAuthServer({
  model: oauthManager.model,
});

const Request = OAuthServer.Request;
const Response = OAuthServer.Response;
const router = express.Router();

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

router.post('/authorize', (request, response) => {
  const req = new Request(request);
  const res = new Response(response);

  oauth.authorize(req, res, {
    authenticateHandler: {
      handle: rq => rq.user,
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
