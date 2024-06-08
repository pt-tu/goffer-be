const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');

const choice = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

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
      type: Number,
      min: 180,
      default: 180,
    },
    type: {
      type: String,
      required: true,
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
    choices: {
      type: [choice],
    },
    difficulty: {
      type: Number,
      default: 1,
      enums: [1, 2, 3],
    },
    kind: {
      type: String,
      default: 'audio',
      enums: ['audio', 'video'],
    },
    org: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Organization',
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);
questionSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
});

/**
 * @typedef Question
 */
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
