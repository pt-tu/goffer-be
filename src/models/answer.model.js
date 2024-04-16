const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const answerSchema = mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    assessment: {
      type: String,
    },
    question: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Question',
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
answerSchema.plugin(toJSON);
answerSchema.plugin(paginate);

/**
 * @typedef Answer
 */
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
