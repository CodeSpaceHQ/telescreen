const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
* User Object
* @typedef {Object} latestSightingSchema
* @param {string} cameraId
* @param {string} POIId
* @param {Date} time
**/
const latestSightingSchema = new Schema({
    cameraId: {
      type: String,
      required: true,
    },
    POIId: {
      type: String,
      unique: true,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  });
  
  const LatestSighting = mongoose.model('LatestSighting', latestSightingSchema);
  
  module.exports = { LatestSighting };