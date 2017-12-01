const AWS = require('aws-sdk');
const async = require('async');
const path = require('path');
const fs = require('fs');
const logger = require('logger/utils');

const bucketName = 'knownfaces';
let pathParams, image, imageName;
const s3 = new AWS.S3({ region: 'us-west-1' });

const createItemObject = (callback) => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
    ACL: 'public-read',
    Body: image,
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      logger.info('Error uploading image: ', err);
      callback(err, null);
    } else {
      logger.info('Successfully uploaded image on S3', data);
      callback(null, data);
    }
  });
};

exports.upload = (req, res, next) => {
  const tmpPath = req.files.file.pathParams;
  image = fs.createReadStream(tmpPath);
  imageName = req.files.file.name;
  async.series([
    createItemObject,
  ], (err, result) => {
    if (err) return res.send(err);

    return res.json({ message: 'Successfully uploaded' });
  });
};

exports.displayForm = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
};
