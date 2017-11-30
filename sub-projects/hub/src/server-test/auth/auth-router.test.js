const request = require('supertest');

require('test-globals.js');
const authTools = require('tools/auth-tools.js');
const testUsers = require('tools/users.js');

describe('Auth Router and Integration', () => {
  describe('POST /api/auth', () => {
    it('should return 201', () => authTools.createAndLoginUser(app, testUsers.admin000));
  });

  describe('DELETE /api/auth', () => {
    it('should return 204 when authorized', async () => {
      const agent = await authTools.createAndLoginUser(app, testUsers.admin000);
      await agent.delete('/api/auth').expect(204);
    });

    it('should return 400 when unauthorized', () => (
      request(app)
        .delete('/api/auth')
        .expect(400)
    ));
  });
});
