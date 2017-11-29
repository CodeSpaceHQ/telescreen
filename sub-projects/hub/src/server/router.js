const express = require('express');

// Routers.
const oauth = require('./oauth/oauth-router.js');
const user = require('./users/user-router.js');

// App routes.
const router = express.Router();
router.use('/oauth', oauth.router);
router.use('/users', user.router);

module.exports = router;
