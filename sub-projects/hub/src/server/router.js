const express = require('express');

// Routers.
const auth = require('./auth/auth-router.js');
const user = require('./users/user-router.js');

// App routes.
const router = express.Router();
router.use('/auth', auth.router);
router.use('/users', user.router);

module.exports = router;
