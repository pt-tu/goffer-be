const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salaryFrom: {
      type: String,
      required: true,
    },
    salaryTo: {
      type: String,
    },
    experience: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
      max: 3,
    },
    tools: {
      type: [String],
      required: true,
      max: 7,
    },
    slots: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    workingHours: {
      type: Number,
      required: true,
    },
    orgId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Organization',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
