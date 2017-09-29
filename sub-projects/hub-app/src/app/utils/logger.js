const logger = require('loglevel');

let envLevel = 'trace';

/* eslint-disable no-undef */
// Checks current build environment
switch (ENV) {
  case 'prod':
    envLevel = 'error';
    break;
  case 'dev':
    envLevel = 'trace';
    break;
  default:
    envLevel = 'trace';
}
/* eslint-enable no-undef */

// Adding date prefix
const originalFactory = logger.methodFactory;
logger.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (message) => {
    let newMessage = message;

    if (message === Object(message)) {
      newMessage = JSON.stringify(message);
    }

    rawMethod(`${new Date()}: ${newMessage}`);
  };
};
// Set level and apply plugin
logger.setLevel(envLevel);

module.exports = logger;
