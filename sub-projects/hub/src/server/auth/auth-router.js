const express = require('express');

const strings = require('resources/strings.js');
const authManager = require('./auth-manager.js');

const authRouter = express.Router();

/**
 * @namespace AuthEndpoint
 */

/**
 * Log the User in on a specific device.
 * 
 * #### Request
 * 
 * - path: `/api/auth`
 * - verb: POST
 * 
 * ```json
 * {
 *   "email": string,
 *   "password": string
 * }
 * ```
 * 
 * #### Response
 * 
 * Status 201 - Success
 * 
 * ```json
 * {
 *   "user": {
 *     "uid": string,
 *     "email": string,
 *   },
 *   "expires": Date
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
 * @name login
 * @func
 * @memberOf AuthEndpoint
 */
authRouter.post('/', (req, res) => {
  authManager.login(req, res)
    .then((output) => {
      // The token is in a cookie, so it doesn't have to be in the body
      res.status(201).json(output).end();
    })
    .catch((err) => {
      res.status(err.status).json({ message: err.message }).end();
    });
});

/**
 * Log the user out of a specific device.
 * 
 * #### Request
 * 
 * - path: `/api/auth`
 * - verb: DELETE
 * 
 * #### Response
 * 
 * Status 204 - Success
 * 
 * Status 400 - Failure
 * 
 * ```json
 * {
 *   "message": string
 * }
 * ```
 * 
 * @name logout
 * @func
 * @memberOf AuthEndpoint
 */
authRouter.delete('/', authManager.verify, (req, res) => {
  if (res.locals.err) {
    res.status(400).json({ message: res.locals.err.message }).end();
    return;
  }

  authManager.logout(req.session)
    .then(() => {
      res.status(204).clearCookie(strings.cookieName, { path: '/' }).end();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message }).end();
    });
});

module.exports = { router: authRouter };
