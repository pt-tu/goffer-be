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
    org: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Organization',
    },
    status: {
      type: String,
      default: 'unpublished',
      enum: ['unpublished', 'published', 'closed', 'expired'],
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    benefits: {
      type: [String],
      max: 7,
    },
    pipeline: {
      type: [String],
      required: true,
      max: 7,
    },
    questions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Question',
      required: true,
      default: [],
    },
    hasFeedback: {
      type: Boolean,
    },
    assessments: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Assessment',
      max: 5,
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
