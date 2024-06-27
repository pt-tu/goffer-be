const moment = require('moment');
const config = require('../config/config');
const tokenService = require('./token.service');
const { tokenTypes } = require('../config/tokens');
const { organizationService } = require('.');
const { Token } = require('../models');

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} organizationId
 * @returns {Promise<Object>}
 */
const generateInvitationToken = async (userId, organizationId) => {
  const expires = moment().add(config.jwt.invitationExpirationDays, 'days');
  const token = tokenService.generateToken(userId, expires, tokenTypes.INVITATION, config.jwt.secret, organizationId);

  await tokenService.saveToken(token, userId, expires, tokenTypes.INVITATION, false, organizationId);

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
 * @param {string} verifyToken
 * @returns {Promise<Object>}
 */
const deleteInvitationToken = async (verifyToken) => {
  const tokenDoc = await tokenService.verifyToken(verifyToken, tokenTypes.INVITATION);

  const user = await userService.getUserById(tokenDoc.user);
  if (!user) {
    throw new ApiError('User not found with this token');
  }

  const org = await organizationService.getOrganizationById(tokenDoc.org);
  if (!org) {
    throw new ApiError('Organization not found with this token');
  }

  const membership = await membershipService.queryMembership({ user: user.id, org: org.id });
  if (membership) {
    membership.invitationToken = null;
    await membership.save();
  }
  await Token.deleteMany({ user: user.id, type: tokenTypes.INVITATION, org: org.id });

  return { token, expires: expires.toDate() };
};

module.exports = {
  generateInvitationToken,
  verifyInvitationToken,
  deleteInvitationToken,
};
