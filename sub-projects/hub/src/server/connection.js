const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let mongoURL;
switch (process.env.NODE_ENV) {
  case 'production': {
    mongoURL = process.env.PROD_MONGODB_URI;
    break;
  }
  case 'development': {
    mongoURL = process.env.DEV_MONGODB_URI;
    break;
  }
  case 'testing': {
    mongoURL = process.env.TEST_MONGODB_URI;
    break;
  }
  default: {
    mongoURL = process.env.DEV_MONGODB_URI;
  }
}

/**
 * Opens a connection from mongoose to the database.
 * @returns {Promise<undefined, Error>} - Resolves when connection is opened.
 */
function open() {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoURL, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

/**
 * Closes the connection from mongoose to the database.
 * @returns {Promise<undefined, Error>} - Resolves when connection is closed.
 */
function close() {
  return mongoose.disconnect();
}

module.exports = { open, close };
