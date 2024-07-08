const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const environmentSchema = mongoose.Schema(
  {
    os: String,
    browserName: String,
    browserVersion: String,
    canvasSize: String,
  },
  {
    _id: false,
  }
);

const reportSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'resolved'],
      default: 'pending',
    },
    relatedPath: String,
    environment: environmentSchema,
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    resolvedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.plugin(toJSON);
reportSchema.plugin(paginate);

module.exports = mongoose.model('Report', reportSchema);
