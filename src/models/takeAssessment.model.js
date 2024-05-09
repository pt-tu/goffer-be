const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const takeAssessmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: 'User',
    },
    assessment: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
      ref: 'Assessment',
    },
    answers: {
      type: [],
    },
    endingAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
takeAssessmentSchema.plugin(toJSON);
takeAssessmentSchema.plugin(paginate);

/**
 * @typedef TakeAssessment
 */
const TakeAssessment = mongoose.model('TakeAssessment', takeAssessmentSchema);

module.exports = TakeAssessment;
