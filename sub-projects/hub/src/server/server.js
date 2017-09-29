const path = require('path');

require('app-module-path').addPath(__dirname);
// load environment variables from .env file.
require('dotenv').load({ path: path.resolve(__dirname, '../../.env') });

const logger = require('../app/utils/logger.js');
const connection = require('./connection.js');
const app = require('./app.js');

// Declarations/Definitions
const port = process.env.PORT || 3000;

connection.open()
  .then(() => {
    app.listen(port, () => {
      logger.info(`App is running at ${port} in ${app.get('env')} mode\n  Press ctrl-c to stop\n`);
    });
  })
  .catch((err) => {
    logger.fatal(err);
    logger.info('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit(1);
  });
