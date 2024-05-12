const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const feedbackSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    sentiment: {
      type: String,
      enum: ['negative', 'neutral', 'positive', 'satisfied', 'very satisfied'],
      require: true,
      trim: true,
    },
    NPS: {
      type: String,
      enum: ['promoters', 'passives', 'detractors'],
      trim: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// feedbackSchema.index({ owner: 1, job: 1 }, { unique: true });

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);
feedbackSchema.plugin(paginate);

/**
 * @typedef Feedback
 */
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
