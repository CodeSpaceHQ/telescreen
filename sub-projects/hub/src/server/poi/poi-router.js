const express = require('express');
const personManager = require('poi/poi-manager.js');

const poiRouter = express.Router();

poiRouter.post('/', (req, res) => {
  personManager.createPerson(req.body)
    .then(() => {
      res.status(201).end();
    });
});

module.exports = { router: poiRouter };
