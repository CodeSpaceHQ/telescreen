const path = require('path');

// load environment variables from .env file.
require('dotenv').load({ path: path.resolve(__dirname, '../../.env') });
// Make sure integration tests have time to run
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const mongoose = require('mongoose');
const app = require('app.js');

mongoose.Promise = global.Promise;
let mongoURL;
if (process.env.NODE_ENV === 'production') {
  mongoURL = process.env.PROD_MONGODB_URI;
} else {
  mongoURL = process.env.DEV_MONGODB_URI;
}

global.mongoose = mongoose;
global.app = app;

beforeAll((done) => {
  mongoose.connect(mongoURL, (err) => {
    if (err) {
      done(err);
      return;
    }

    done();
  });
});

afterAll(() => mongoose.disconnect());
