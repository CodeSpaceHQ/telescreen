const express = require('express');

const userManager = require('users/user-manager');
const authManager = require('auth/auth-manager');

const userRouter = express.Router();

userRouter.post('/', authManager.verify, (req, res) => {
  userManager.createAdmin(req.body)
    .then((uid) => {
      res.status(201).json({ uid }).end();
    })
    .catch((err) => {
      res.status(err.status).json({ message: err.message }).end();
    });
});

module.exports = { router: userRouter };
