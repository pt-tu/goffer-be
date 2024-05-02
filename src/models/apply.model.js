const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const applySchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
    },
    applicant: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
    },
    pipeline: {
      type: [String],
      required: true,
      max: 7,
    },
    resume: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
applySchema.plugin(toJSON);
applySchema.plugin(paginate);

/**
 * @typedef Apply
 */
const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
