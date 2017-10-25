const express = require('express');
const userManager = require('users/user-manager');
const authManager = require('auth/auth-manager');

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
  userManager.createUser(req.body, (err, uid) => {
    if (err) {
      console.log(err);
      res.status(400).json(err).end();
    } else {
      res.status(201).json({ uid }).end();
    }
  });
});

userRouter.get('/', authManager.verify, (req, res) => {
  const uid = res.locals.uid;
  userManager.getUserById(uid, {}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send(err).end();
      return;
    }

    if (!user) {
      console.log('No user found.');
      res.status(404).end();
      return;
    }

    res.status(200).json(user).end();
  });
});

module.exports = { router: userRouter };