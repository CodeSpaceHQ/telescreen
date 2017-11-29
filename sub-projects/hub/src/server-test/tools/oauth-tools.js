const request = require('supertest');

const initialize = require('utils/db.js').initialize;

/**
 * Uses the server to create and login an admin.
 *
 * @param {Object} server - Running server.
 * @param {Object} user - Data needed to login user.
 * @param {string} user.email - Email that isn't already in database.
 * @param {string} user.password - Password for user.
 * @return {Promise<Object, Error>} - Resolves with token response.
 */
async function createAndLoginUser(server, user) {
  try {
    await initialize();

    const resClient = await request(server)
      .post('/api/oauth/client')
      .send({
        redirectURL: 'http://127.0.0.1:8080',
        email: 'test@ttu.edu',
      })
      .type('form')
      .expect(200);

    const res = await request(server)
      .post('/api/oauth/token')
      .send({
        username: user.email,
        password: user.password,
        grant_type: 'password',
        client_id: resClient.body.clientId,
      })
      .type('form')
      .expect(200);

    return res.body;
  } catch (err) {
    throw err;
  }
}

module.exports = { createAndLoginUser };
