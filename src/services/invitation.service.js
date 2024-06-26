const moment = require('moment');
const console = require('console');
const config = require('../config/config');
const tokenService = require('./token.service');
const { tokenTypes } = require('../config/tokens');

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} organizationId
 * @returns {Promise<Object>}
 */
const generateInvitationToken = async (userId, organizationId) => {
  const expires = moment().add(config.jwt.invitationExpirationDays, 'days');
  const token = tokenService.generateToken(userId, expires, tokenTypes.INVITATION, config.jwt.secret, organizationId);

  await tokenService.saveToken(token, userId, expires, tokenTypes.INVITATION);

  return { token, expires: expires.toDate() };
};

/**
 *
 * @param {string} invitationToken
 * @returns {Promise<ObjectId>}
 */
const verifyInvitationToken = async (invitationToken) => {
  const tokenDoc = await tokenService.verifyToken(invitationToken, tokenTypes.INVITATION);
  console.log('🚀 ~ file: invitation.service.js:29 ~ verifyInvitationToken ~ tokenDoc:', tokenDoc);
  const { user: userId, organization: organizationId } = tokenDoc;
  return { userId, organizationId };
};

module.exports = {
  generateInvitationToken,
  verifyInvitationToken,
};
