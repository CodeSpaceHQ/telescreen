const sightingModels = require('sighting/sighting-models');
const latestSightingModels = require('sighting/latest-sighting-models');

const errors = require('resources/errors.js');
const mailer = require('utils/mailer.js');

const Sighting = sightingModels.Sighting;
const LatestSighting = latestSightingModels.LatestSighting;

async function createSighting(data) {
  try {
    // Ensure the required data is available.
    if (!data) {
      throw new errors.MissingParametersError();
    }   
    const info = {
      cameraId: data.cameraId,
      POIId: data.POIId,
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
    };
    
    const sighting = new Sighting(info);
    
    const created = await sighting.save();
    
    return created.id;
  } catch (err) {
    throw err;
  }
}

async function createLatestSighting(data) {
  try {
    // Ensure the required data is available.
    if (!data) {
      throw new errors.MissingParametersError();
    }

    const info = {
      POIId: data.POIId,
      timeEnd: data.timeEnd,
    };

    const latestSighting = new LatestSighting(info);

    const existing = await LatestSighting.findOne({ POIId: latestSighting.POIId }).exec();

    if (existing) {
      // const updated = await LatestSighting.findById(function(err,result){
      //   if(err){
      //     console.log(err);
      //   }
      //   console.log("Result: "+result);;
      //   res.send(result);
      // });

      LatestSighting.findOneAndUpdate({ POIId: latestSighting.POIId }, data, {new: true},function(err){
        if (err) {
          console.log(err);
        };
      })
    }
    
    const created = await latestSighting.save();

    return created.id;
  } catch (err) {
    throw err;
  }
}

module.exports = { createSighting, createLatestSighting };
