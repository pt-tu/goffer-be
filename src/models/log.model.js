const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
  {
    ref: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    identifier: {
      type: String,
    },
    url: {
      type: String,
    },
    pathname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

logSchema.index({ type: 1, identifier: 1, ref: 1 });

module.exports = mongoose.model('Log', logSchema);
