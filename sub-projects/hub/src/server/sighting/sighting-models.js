const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
* User Object
* @typedef {Object} sightingSchema
* @param {string} cameraId
* @param {string} POIId
* @param {Date} timeStamp
*/
const sightingSchema = new Schema({
  cameraId: {
    type: String,
    required: true,
  },
  POIId: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
  },
});

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
    default: null,
  },
});

// sightingSchema.pre('save', function pre(next) {
//     const sighting = this;
//     next();
//     return;
// });

const LatestSighting = mongoose.model('LatestSighting', latestSightingSchema);

const Sighting = mongoose.model('Sighting', sightingSchema);

module.exports = { Sighting, LatestSighting };