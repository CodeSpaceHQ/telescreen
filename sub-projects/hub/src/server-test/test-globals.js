const path = require('path');

// load environment variables from .env file.
require('dotenv').load({ path: path.resolve(__dirname, '../../.env') });
// Make sure integration tests have time to run
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const mongoose = require('mongoose');
const mockgoose = require('mockgoose');
const app = require('app.js');
const connection = require('connection.js');

global.mongoose = mongoose;
global.mockgoose = mockgoose;
global.app = app;

beforeAll(() => connection.open());

afterAll(() => connection.close());
