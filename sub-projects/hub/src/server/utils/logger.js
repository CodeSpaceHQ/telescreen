const winston = require('winston');
const path = require('path');

/**
 * Logging tool for the server.
 *
 * @typedef {function} - ApiLogger
 * @example
 * const logger = require('utils/logger.js');
 * logger.fatal('Message');
 * logger.error('Message');
 * logger.warn('Message');
 * logger.info('Message');
 * logger.debug('Message');
 * logger.trace('Message');
 */

// Set up logger
const customColors = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'grey',
  trace: 'white',
};

let logLevel;

switch (process.env.NODE_ENV) {
  case 'production':
    logLevel = 'error';
    break;
  case 'development':
    logLevel = 'debug';
    break;
  case 'testing':
    logLevel = 'off';
    break;
  default:
    logLevel = 'error';
}

const logger = new winston.Logger({
  colors: customColors,
  level: logLevel,
  levels: {
    off: 0,
    fatal: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
    trace: 6,
  },
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
    }),
    new winston.transports.File({ filename: `${path.resolve(__dirname, '../logs')}/combined.log` }),
  ],
});

winston.addColors(customColors);

module.exports = logger;
