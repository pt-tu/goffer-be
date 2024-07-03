const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const answerSchema = mongoose.Schema(
  {
    url: {
      type: String,
    },
    summary: {
      type: String,
      trim: true,
    },
    assessment: {
      type: String, // assessment for answer
    },
    question: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Question',
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    duration: {
      type: Number, // duration of audio question (seconds)
    },
    point: {
      type: Number,
    },
    content: {
      type: String,
    },
    ref: {
      type: String,
      required: true,
    },
    submitSeconds: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

answerSchema.index({ owner: 1, question: 1, ref: 1 }, { unique: true });

// add plugin that converts mongoose to json
answerSchema.plugin(toJSON);
answerSchema.plugin(paginate);

/**
 * @typedef Answer
 */
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
