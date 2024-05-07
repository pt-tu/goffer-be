const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const answerSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
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
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    duration: {
      type: Number,
      required: true,
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
