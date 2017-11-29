const path = require('path');

require('app-module-path').addPath(__dirname);
require('app-module-path').addPath(path.resolve(__dirname, '../server/utils'));

const logger = require('logger.js');
const app = require('./app.js');

// Declarations/Definitions
const port = 3001;

app.listen(port, () => {
  logger.info(`App is running at ${port} in ${app.get('env')} mode\n  Press ctrl-c to stop\n`);
});
