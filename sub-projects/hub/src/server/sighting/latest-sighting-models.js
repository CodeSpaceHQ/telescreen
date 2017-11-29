const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
* User Object
* @typedef {Object} latestSightingSchema
* @param {string} POIId
* @param {Date} timeEnd
*/
const latestSightingSchema = new Schema({
  POIId: {
    type: String,
    unique: true,    
    required: true,
  },
  timeEnd: {
    type: Date,
    default: null,
  },
  versionKey: false
});

latestSightingSchema.pre('save', function pre(next) {
    const sighting = this;
    next();
    return;
});


const LatestSighting = mongoose.model('LatestSighting', latestSightingSchema);

module.exports = { LatestSighting };