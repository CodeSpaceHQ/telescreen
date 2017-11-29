require('test-globals.js');
const OAuthTools = require('tools/oauth-tools.js');
const testUsers = require('tools/users.js');

describe('OAuth2 Router and Integration', () => {
  beforeEach((done) => {
    mockgoose.reset();
    done();
  });

  describe('POST /api/oauth/token GRANT password', () => {
    it('should return 200 with correct credentials', () => (
      OAuthTools.createAndLoginUser(app, testUsers.admin000)),
    );
  });
});
