const express = require('express');

const personManger = require('personofinterest/poi-manager.js');

const poiRouter = express.Router();

poiRouter.post('/', (req,res) => {
  personManager.createPerson(req.body)
});

module.exports = {}
