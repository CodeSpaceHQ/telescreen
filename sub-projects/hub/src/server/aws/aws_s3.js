const AWS = require('aws-sdk');
const async = require('async');
const bucketName = 'knownfaces';
const path = require('path');
const fs = require('fs');
let pathParams, image, imageName;

const s3 = new AWS.S3({region: 'us-west-1'});
const createItemObject = (callback) => {
  const params = {
    Bucket: bucketName,
    Key: '${imageName}',
    ACL: 'public-read',
    Body: image
  };
    s3.putObject(params, function(err, data){
      if(err){
        console.log("Error uploading image: ", err);
        callback(err,NULL);
      } else {
        console.log("Successfully uploaded image on S3", data);
        callback(null, data);
      }
    })
}
exports.upload = (req, res, next) => {
  var tmp_path = req.files.file.pathParams;
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
