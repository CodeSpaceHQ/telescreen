const fs = require('fs');
const path = require('path');

const envValues = {
  PROD_MONGODB_URI: process.env.PROD_MONGODB_URI,
  DEV_MONGODB_URI: process.env.DEV_MONGODB_URI,
  INIT_USERNAME: process.env.INIT_USERNAME,
  INIT_PASSWORD: process.env.INIT_PASSWORD,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  SALT: process.env.SALT,
};

let content = '';
Object.keys(envValues).forEach((value) => {
  content += `${value}=${envValues[value]}\n`;
});

const filePath = path.resolve(__dirname, '../../../.env');

/* eslint-disable no-console */
fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Successfully created .env file!');
});
