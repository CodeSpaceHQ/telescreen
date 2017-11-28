const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* POI Object
* @typedef {Object} personSchema
* @param {string} personId
* @param {string} name
**/

const PersonSchema = new Schema({
  personId: {
    type: String,
    unique: true,
    required: true
  },
  name:{
    type: String,
    required: true
  }
});

const  POI = mongoose.model('person', PersonSchema);

module.exports = POI;
