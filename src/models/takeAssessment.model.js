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
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Answer',
      default: [],
    },
    status: {
      type: String,
      default: 'pending',
    },
    endingAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

takeAssessmentSchema.index({ user: 1, assessment: 1 }, { unique: true });

// add plugin that converts mongoose to json
takeAssessmentSchema.plugin(toJSON);
takeAssessmentSchema.plugin(paginate);

/**
 * @typedef TakeAssessment
 */
const TakeAssessment = mongoose.model('TakeAssessment', takeAssessmentSchema);

module.exports = TakeAssessment;
