const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    constraint: {
      //   limit audio time, min length of answer will update after
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
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
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

/**
 * @typedef Question
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
