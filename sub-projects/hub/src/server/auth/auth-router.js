const express = require('express');

const strings = require('resources/strings.js');
const authManager = require('./auth-manager.js');

const authRouter = express.Router();

// Log the User in on a specific device.
authRouter.post('/', (req, res) => {
  authManager.login(req, res)
    .then((output) => {
      // The token is in a cookie, so it doesn't have to be in the body
      res.status(201).json(output).end();
    })
    .catch((err) => {
      res.status(err.status).json({ message: err.message }).end();
    });
});

// Log the user out of a specific device.
authRouter.delete('/', authManager.verify, (req, res) => {
  if (res.locals.err) {
    res.status(400).json({ message: res.locals.err.message }).end();
    return;
  }

  authManager.logout(req.session)
    .then(() => {
      res.status(204).clearCookie(strings.cookieName, { path: '/' }).end();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message }).end();
    });
});

module.exports = { router: authRouter };
