const sightingModels = require('sighting/sighting-models');

const errors = require('resources/errors.js');
const mailer = require('utils/mailer.js');

const Sighting = sightingModels.Sighting;

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

    const existing = await Sighting.findOne({ POIId: sighting.POIId }).exec();

    if (existing) {
      throw new errors.ExistingAccountError();
    }

    const created = await sighting.save();

    return created.id;
  } catch (err) {
    throw err;
  }
}

module.exports = { createSighting };
