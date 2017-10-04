const path = require('path');

module.exports = {
  modulePaths: ['src/server', 'node_modules'],
  testEnvironment: 'node',
  testMatch: [
    path.resolve(__dirname, 'src/server/**/*.test.js'),
  ],
};
