const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const recommendationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isHide: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
recommendationSchema.plugin(toJSON);
recommendationSchema.plugin(paginate);

/**
 * @typedef Recommendation
 */
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
