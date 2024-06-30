const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const evaluationSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    answer: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Answer',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
    },
    score: {
      type: Number,
      required: true,
      enums: [1, 2, 3, 4, 5],
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

evaluationSchema.plugin(toJSON);
evaluationSchema.plugin(paginate);

module.exports = mongoose.model('Evaluation', evaluationSchema);
