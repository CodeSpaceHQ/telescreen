const path = require('path');

module.exports = {
  modulePaths: [
    'src/server',
    'src/server-test',
    'node_modules',
  ],
  testEnvironment: 'node',
  testMatch: [
    path.resolve(__dirname, 'src/server-test/**/*.test.js'),
  ],
};
