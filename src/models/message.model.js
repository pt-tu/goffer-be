const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
  {
    rid: {
      type: String,
      require: true,
    },
    msg: {
      type: String,
      require: true,
    },
    u: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
