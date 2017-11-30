const POI = require('poi/poi-models');
//  const AWS = require('poi/aws-s3.js');

const errors = require('resoures/error.js');

async function createPerson(data) {
  try {
    //  Ensure the required data is avaiable.
    if (!data) {
      throw new errors.MissingParametersError();
    }

    const info = {
      personId: data.personId,
      name: data.name,
    };

    const person = new POI(info);

    await person.save();

    return person.personId;
  } catch (err) {
    throw err;
  }
}

module.exports = { createPerson };
