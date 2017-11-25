const POI = require('personofinterest/poi-models');

const errors =require('resoures/error.js');

async function createPerson(data){
  try{
    //Ensure the required data is avaiable.
    if(!data){
      throw new errors.MissingParametersError();
    }

    const info ={
      personId: data.personId
      name: data.name
      fileRef: data.fileRef
    };

    const person = new POI(info);

    return person.personId;
  } catch (err) {
    throw err;
  }
}

module.exports = { createPerson }
