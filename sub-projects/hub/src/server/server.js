const path = require('path');

require('app-module-path').addPath(__dirname);
// load environment variables from .env file.
require('dotenv').load({ path: path.resolve(__dirname, '../../.env') });

const logger = require('./utils/logger.js');
const connection = require('./connection.js');
const app = require('./app.js');
const initialize = require('./utils/uses-db.js').initialize;

// Declarations/Definitions
const port = process.env.PORT || 3000;

connection.open()
  .catch((err) => {
    logger.fatal(err);
    logger.info('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit(1);
  })
  .then(() => initialize())
  .then(() => {
    app.listen(port, () => {
      logger.info(`App is running at ${port} in ${app.get('env')} mode\n  Press ctrl-c to stop\n`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
