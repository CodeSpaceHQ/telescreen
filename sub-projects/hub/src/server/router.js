const express = require('express');

// Routers.
const auth = require('./auth/auth-router.js');
const user = require('./users/user-router.js');
const poi = require('./poi/poi-router.js');

// App routes.
const router = express.Router();
router.use('/auth', auth.router);
router.use('/users', user.router);
router.use('/poi', poi.router);

module.exports = router;
