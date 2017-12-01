const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
* User Object
* @typedef {Object} sightingSchema
* @param {string} cameraId
* @param {string} POIId
* @param {Date} time
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
    default: Date.now,
  },
});

const Sighting = mongoose.model('Sighting', sightingSchema);

module.exports = { Sighting };