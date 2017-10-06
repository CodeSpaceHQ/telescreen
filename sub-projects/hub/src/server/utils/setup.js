const fs = require('fs');
const path = require('path');

const envValues = [
  process.env.PROD_MONGODB_URI,
  process.env.DEV_MONGODB_URI,
  process.env.INIT_USERNAME,
  process.env.INIT_PASSWORD,
  process.env.PORT,
  process.env.SECRET,
  process.env.SALT,
];

let content = '';
envValues.forEach((element) => {
  content += `${element}\n`;
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
