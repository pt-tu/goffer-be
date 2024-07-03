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
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    phase: {
      type: String, // the first step in pipeline
      default: 'init',
    },
    resume: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
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
      require: true,
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
    personalWebsite: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    answers: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Answer',
      default: [],
    },
    match: {
      type: Number,
    },
    reason: {
      type: String,
    },
    rating: {
      type: Number,
    },
    assessmentAvg: {
      type: Number,
    },
    timeToSubmit: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

applySchema.index(
  {
    job: 1,
    owner: 1,
  },
  {
    unique: true,
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
