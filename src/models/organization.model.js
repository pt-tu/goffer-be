const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    visibility: {
      type: String,
      required: true,
      enum: ['public', 'private'],
    },
    website: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      minLength: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Constraints
organizationSchema.index(
  {
    domain: 1,
  },
  {
    unique: true,
    partialFilterExpression: { domain: { $exists: true } },
  }
);

// add plugin that converts mongoose to json
organizationSchema.plugin(toJSON);
organizationSchema.plugin(paginate);

/**
 * Check if corporate email is taken
 * @param {string} email
 * @param {ObjectId} excludeOrganizationId
 * @returns {Promise<boolean>}
 */
organizationSchema.statics.isEmailTaken = async function (email, excludeOrganizationId) {
  const organization = await this.findOne({ email, _id: { $ne: excludeOrganizationId } });
  return !!organization;
};

/**
 * Check if domain is taken
 * @param {string} email
 * @param {ObjectId} excludeOrganizationId
 * @returns {Promise<boolean>}
 */
organizationSchema.statics.isDomainTaken = async function (domain, excludeOrganizationId) {
  const organization = await this.findOne({ domain, _id: { $ne: excludeOrganizationId } });
  return !!organization;
};

/**
 * @typedef Organization
 */
const Organization = mongoose.model('Organization', organizationSchema);

Organization.createIndexes();

module.exports = Organization;
