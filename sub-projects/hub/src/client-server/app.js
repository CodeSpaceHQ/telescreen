const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Declarations/Definitions
const port = 3000;
const app = express();
const format = ':method :url :status :response-time ms - :res[content-length]';
const corsOptions = {};

// NODE_ENV dependent variations
switch (process.env.NODE_ENV) {
  default:
    corsOptions.origin = '*';
}

// Express configuration.
app.use(cors(corsOptions));
app.set('port', port);
app.use(morgan(format, {
  skip() { return process.env.NODE_ENV === 'testing'; },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes.
app.use('/', express.static(`${__dirname}/../../public/client`));

// 404.
app.use((req, res, next) => {
  const err = new Error('Route not found.');

  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
