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
  timeStart: {
    type: Date,
    default: null,
  },
  timeEnd: {
    type: Date,
    default: Date.now,
  }
});

sightingSchema.pre('save', function pre(next) {
    const sighting = this;
    next();
    return;
});


const Sighting = mongoose.model('Sighting', sightingSchema);

module.exports = { Sighting };