const express = require('express');

const userManager = require('users/user-manager');
const authManager = require('auth/auth-manager');

const userRouter = express.Router();

/**
 * @namespace UsersEndpoint
 */

/**
 * Create an admin.
 * 
 * Note: requires the user to be logged in.
 * 
 * #### Request
 * 
 * - path: `/api/users`
 * - verb: POST
 * 
 * ```json
 * {
 *   "email": string
 * }
 * ```
 * 
 * #### Response
 * 
 * Status 201 - Success
 * 
 * ```json
 * {
 *   "uid": string
 * }
 * ```
 * 
 * Status 400 or 401 - Failure
 * 
 * ```json
 * {
 *   "message": string
 * }
 * ```
 * 
 * @name createAdmin
 * @func
 * @memberOf UsersEndpoint
 */
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
