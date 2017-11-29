const OAuth2Server = require('oauth2-server');

const OAuthManager = require('oauth/oauth-manager.js');

const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

/**
 * Middleware to determine whether the request is authenticated.
 * For valid requests, the next middleware is called.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @param {function} next - Invoke the next middleware or route.
 */
function verify(request, response, next) {
  const req = new Request(request);
  const res = new Response(response);

  OAuthManager.server.authenticate(req, res)
    .then((token) => {
      res.locals.oauth = { token };

      next();
    })
    .catch((err) => {
      // Prevent execution of later middleware for efficiency and clarity.
      response.status(err.status).json(err).end();
    });
}

module.exports = {
  verify,
};
