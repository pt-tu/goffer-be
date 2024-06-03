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
      //   limit audio time
      type: Number,
      min: 180,
      default: 180,
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
    sample: {
      type: String,
    },
    answer: {
      type: String,
    },
    order: {
      type: Number,
      require: true,
    },
    difficulty: {
      type: Number,
      default: 1,
      enums: [1, 2, 3],
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
