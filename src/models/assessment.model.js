const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const assessmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
    },
    questions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Question',
      require: true,
      min: 1,
    },
    duration: {
      type: Number,
      require: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: 'User',
    },
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: 'Job',
    },
    order: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
assessmentSchema.plugin(toJSON);
assessmentSchema.plugin(paginate);

/**
 * @typedef Assessment
 */
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
