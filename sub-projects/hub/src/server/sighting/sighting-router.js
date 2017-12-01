const express = require('express');

const sightingManager = require('sighting/sighting-manager');
const authManager = require('auth/auth-manager');

const sightingRouter = express.Router();

sightingRouter.post('/', authManager.verify, (req, res) => {
  sightingManager.createSighting(req.body)
    .then((SightingID) => {
      res.status(201).json({ SightingID }).end();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message }).end();
    })
});

module.exports = { router: sightingRouter };
