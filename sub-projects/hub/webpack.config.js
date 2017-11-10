const appProd = require('./webpack/app-prod.js');
const appDev = require('./webpack/app-dev.js');
const oauthProd = require('./webpack/oauth-prod.js');
const oauthDev = require('./webpack/oauth-dev.js');

function config(env) {
  switch (env) {
    case 'app-prod':
      process.env.NODE_ENV = 'production';
      return appProd;
    case 'app-dev':
      process.env.NODE_ENV = 'development';
      return appDev;
    case 'oauth-prod':
      process.env.NODE_ENV = 'production';
      return oauthProd;
    case 'oauth-dev':
      process.env.NODE_ENV = 'development';
      return oauthDev;
    default:
      console.log('Invalid config: defaulting to appProd');
      process.env.NODE_ENV = 'production';
      return appProd;
  }
}

module.exports = config;
