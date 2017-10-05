const request = require('supertest');

/**
 * Uses the server login an admin.
 * Resovles with the server agent, persisting the session cookie.
 *
 * @param {Object} server - Running server.
 * @param {Object} user - Data needed to login user.
 * @param {string} user.email - Email that isn't already in database.
 * @param {string} user.password - Password for user.
 * @return {Promise<Object, Error>} - Resolves with supertest agent.
 */
async function loginUser(server, user) {
  const agent = request.agent(server);

  try {
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

module.exports = { loginUser };
