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
      maxLength: 10000,
    },
    constraint: {
      type: Number,
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
    gradingInput: {
      type: String,
      required() {
        return this.type === 'coding';
      },
    },
    gradingOutput: {
      type: String,
      required() {
        return this.type === 'coding';
      },
    },
    exampleInput: {
      type: String,
      required() {
        return this.type === 'coding';
      },
    },
    exampleOutput: {
      type: String,
      required() {
        return this.type === 'coding';
      },
    },
    numberOfTestCaseLines: {
      type: Number,
      min: 1,
      required() {
        return this.type === 'coding';
      },
    },
    numberOfOutputLines: {
      type: Number,
      min: 1,
      required() {
        return this.type === 'coding';
      },
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
