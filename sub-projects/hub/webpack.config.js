const appProd = require('./webpack/app-prod.js');
const appDev = require('./webpack/app-dev.js');

/* eslint-disable no-console */
function config(env) {
  switch (env) {
    case 'app-prod':
      process.env.NODE_ENV = 'production';
      return appProd;
    case 'app-dev':
      process.env.NODE_ENV = 'development';
      return appDev;
    default:
      console.log('Invalid config: defaulting to appProd');
      process.env.NODE_ENV = 'production';
      return appProd;
  }
}

module.exports = config;
