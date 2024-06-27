const httpStatus = require('http-status');
const moment = require('moment');
const config = require('../config/config');
const tokenService = require('./token.service');
const { tokenTypes } = require('../config/tokens');
const { organizationService, userService } = require('.');
const { Token, Membership } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} organizationId
 * @returns {Promise<Object>}
 */
const generateInvitationToken = async (userId, organizationId) => {
  const expires = moment().add(config.jwt.invitationExpirationDays, 'days');
  const token = tokenService.generateToken(userId, expires, tokenTypes.INVITATION, config.jwt.secret, organizationId);

  const update = {
    token,
    expires: expires.toDate(),
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await Token.findOneAndUpdate({ user: userId, org: organizationId, type: tokenTypes.INVITATION }, update, options);

  return { token, expires: expires.toDate() };
};

/**
 *
 * @param {string} invitationToken
 * @returns {Promise<ObjectId>}
 */
const verifyInvitationToken = async (invitationToken) => {
  const tokenDoc = await tokenService.verifyToken(invitationToken, tokenTypes.INVITATION);
  const { user: userId, org: orgId } = tokenDoc;
  return { userId, orgId };
};

/**
 *
 * @param {string} token
 * @returns {Promise<Membership>}
 */
const deleteInvitationToken = async (token) => {
  const tokenDoc = await tokenService.verifyToken(token, tokenTypes.INVITATION);

  const user = await userService.getUserById(tokenDoc.user);
  if (!user) {
    throw new ApiError('User not found with this token');
  }

  const org = await organizationService.getOrganizationById(tokenDoc.org);
  if (!org) {
    throw new ApiError('Organization not found with this token');
  }

  const membership = await Membership.findOne({ user: user.id, org: org.id });
  if (!membership) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Membership not found');
  }

  membership.invitationToken = null;
  await membership.save();
  await Token.deleteMany({ user: user.id, type: tokenTypes.INVITATION, org: org.id });

  return membership;
};

module.exports = {
  generateInvitationToken,
  verifyInvitationToken,
  deleteInvitationToken,
};
