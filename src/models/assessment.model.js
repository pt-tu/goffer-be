const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');

/**
 * @typedef Assessment
 * @property {string} title - The title of the assessment
 * @property {string} [description] - The description of the assessment
 * @property {ObjectId[]} questions - Array of Question IDs included in the assessment
 * @property {number} duration - The duration of the assessment in seconds
 * @property {ObjectId} owner - The ID of the User who owns the assessment
 * @property {ObjectId} org - The ID of the Organization associated with the assessment
 * @property {ObjectId} job - The ID of the Job associated with the assessment
 * @property {number} order - The order of the assessment
 * @property {string} status - The status of the assessment (draft, published, archived)
 * @property {Date} createdAt - Timestamp of when the assessment was created
 * @property {Date} updatedAt - Timestamp of when the assessment was last updated
 */

const assessmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Question',
      required: true,
    },
    duration: {
      type: Number, // seconds
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    org: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Organization',
    },
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
    },
    order: {
      type: Number,
      required: true,
      default: -1,
      max: 4,
    },
    status: {
      type: String,
      default: 'draft',
      enum: ['draft', 'published', 'archived'],
    },
    image: {
      type: String,
    },
    due: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
assessmentSchema.plugin(toJSON);
assessmentSchema.plugin(paginate);
assessmentSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
});

/**
 * @typedef Assessment
 */
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
