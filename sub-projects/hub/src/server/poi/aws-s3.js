const AWS = require('aws-sdk');
const async = require('async');
const path = require('path');
const fs = require('fs');
const log = require('custom-logger')

const bucketName = 'knownfaces';
let pathParams, image, imageName;
const s3 = new AWS.S3({region: 'us-west-1'});

const createItemObject = (callback) => {
  Bucket: bucketName,
  const params = {
    Key: imageName,
    ACL: 'public-read',
    Body: image
  };

  s3.putObject(params, (err, data) => {
    if(err){
      log.info("Error uploading image: ", err);
      callback(err,NULL);
    } else {
      log.info("Successfully uploaded image on S3", data);
      callback(null, data);
    }
  })
}

exports.upload = (req, res, next) => {
  const tmp_path = req.files.file.pathParams;
  image = fs.createReadStream(tmp_path);
  imageName = req.files.file.name;
  async.series([
    createItemObject
  ], (err, result) => {
    if(err) return res.send(err);
    else return res.json({message: "Successfully uploaded"});
  })
}

exports.displayForm = (req, res) =>{
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
}
