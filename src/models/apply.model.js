const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const applySchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
    },
    applicant: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
    },
    resume: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    name: {
      type: String,
      trim: true,
    },
    lastCompany: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      require: true,
    },
    answers: {
      type: [
        {
          question: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Question',
          },
          duration: Number,
          answerUrl: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
applySchema.plugin(toJSON);
applySchema.plugin(paginate);

/**
 * @typedef Apply
 */
const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
