const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const membershipSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    org: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'interviewer', 'member'],
      default: 'member',
    },
    status: {
      type: String,
      enum: ['sent', 'accepted', 'rejected', 'blocked'],
      default: 'sent',
    },
    title: {
      type: String,
    },
    invitationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
membershipSchema.plugin(toJSON);
membershipSchema.plugin(paginate);

/**
 * @typedef Membership
 */
const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
