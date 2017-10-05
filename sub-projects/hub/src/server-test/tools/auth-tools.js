const request = require('supertest');

const initialize = require('utils/db.js').initialize;

/**
 * Uses the server to create and login an admin.
 * Resovles with the server agent, persisting the session cookie.
 *
 * @param {Object} server - Running server.
 * @param {Object} user - Data needed to login user.
 * @param {string} user.email - Email that isn't already in database.
 * @param {string} user.password - Password for user.
 * @return {Promise<Object, Error>} - Resolves with supertest agent.
 */
async function createAndLoginUser(server, user) {
  const agent = request.agent(server);

  try {
    await initialize();

    await agent.post('/api/auth')
      .send({
        email: user.email,
        password: user.password,
      })
      .type('form')
      .expect(201);

    return agent;
  } catch (err) {
    throw err;
  }
}

module.exports = { createAndLoginUser };
