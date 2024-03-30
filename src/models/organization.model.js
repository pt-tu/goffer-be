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
      trim: true,
      lowercase: true,
      minLength: 1,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
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
