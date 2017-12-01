const express = require('express');

// Routers.
const oauth = require('./oauth/oauth-router.js');
const user = require('./users/user-router.js');
const sighting = require('./sighting/sighting-router.js');

// App routes.
const router = express.Router();
router.use('/oauth', oauth.router);
router.use('/users', user.router);
router.use('/sighting', sighting.router);

module.exports = router;
