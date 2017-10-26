const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
* User Object
* @typedef {Object} AdminSchema
* @param {string} email
* @param {string} password
*/
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
*  Saves the admin's password
*/
adminSchema.pre('save', function pre(next) {
  const admin = this;

  // If the password is not modified, continue saving the user.
  if (!admin.isModified('password')) {
    next();
    return;
  }

  bcrypt.genSalt(Number(process.env.SALT), (saltErr, salt) => {
    if (saltErr) {
      next(saltErr);
      return;
    }

    bcrypt.hash(admin.password, salt, (hashErr, hash) => {
      admin.password = hash;
      next(hashErr);
    });
  });
});

/**
*  Updates the admin's password
*/
adminSchema.pre('findOneAndUpdate', function preUpdate(next) {
  const password = this.getUpdate().$set.password;

  // If the password is not modified, continue saving the user.
  if (!password) {
    next();
    return;
  }

  bcrypt.genSalt(Number(process.env.SALT), (saltErr, salt) => {
    if (saltErr) {
      next(saltErr);
      return;
    }

    bcrypt.hash(password, salt, (hashErr, hash) => {
      /* eslint-disable no-underscore-dangle */
      this._update.$set.password = hash;
      /* eslint-enable no-underscore-dangle */
      next(hashErr);
    });
  });
});

/**
* Helper method to check users password
* @param {string} password - The password to be compared to the user's password
* @returns {Promise<boolean, Error>} - Resolves with a boolean indicating whether
* or not the password is a match
*/
adminSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.statics.genPassword = async function genPassword() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(10, (err, buf) => {
      if (err) {
        return reject(err);
      }

      return resolve(buf.toString('hex').slice(0, 20));
    });
  });
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin };
