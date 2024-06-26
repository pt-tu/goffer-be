const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Membership, Organization } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService, organizationService, invitationService } = require('.');
/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} orgId
 * @returns {Promise<boolean>}
 */
const isUserOwner = async (userId, orgId) => {
  const membership = await Membership.findOne({
    user: userId,
    org: orgId,
    role: 'owner',
  });
  const org = await Organization.findOne({ org: orgId, owner: userId });
  return !!membership || !!org;
};

/**
 *
 * @param {Object} body
 * @returns {Promise<Membership>}
 */
const createMembership = async (body) => {
  const user = await userService.getUserByEmail(body.email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const org = await organizationService.getOrganizationById(body.org);
  if (!org) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }

  const { token, expires } = await invitationService.generateInvitationToken(user.id, org.id);

  const update = pick(body, ['role', 'status', 'title']);
  update.user = user.id;
  update.invitationToken = token;

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const membership = await Membership.findOneAndUpdate({ user: user.id, org: org.id }, update, options);

  return { membership, expires };
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 * @returns {Promise<QueryResult>}
 */
const queryMemberships = async (filter, options) => {
  const memberships = await Membership.paginate(filter, options);
  return memberships;
};

/**
 *
 * @param {ObjectId} id
 * @returns {Promise<Membership>}
 */
const getMembershipById = async (id) => {
  const membership = await Membership.findById(id);
  if (!membership) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Membership not found');
  }
  return membership;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} membershipId
 * @param {Object} updateBody
 * @returns {Promise<Membership>}
 */
const updateMembershipById = async (userId, membershipId, updateBody) => {
  const membership = await Membership.findById(membershipId);

  const isOwner = await isUserOwner(userId, membership.org);
  if (isOwner) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can update');
  }

  Object.assign(membership, updateBody);
  await membership.save();
  return membership;
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} membershipId
 * @returns {Promise<Membership>}
 */
const deleteMembershipById = async (userId, membershipId) => {
  const membership = await Membership.findById(membershipId);

  const isOwner = await isUserOwner(userId, membership.org);
  if (isOwner) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can delete');
  }

  await membership.remove();
  return membership;
};

/**
 *
 * @param {ObjectId} userId
 * @returns {Promise<Membership[]>}
 */
const getUserMemberships = async (userId) => {
  return Membership.find({ user: userId }).populate('org');
};

/**
 *
 * @param {ObjectId} orgId
 * @returns {Promise<Membership[]>}
 */
const getOrganizationMemberships = async (orgId) => {
  return Membership.find({ org: orgId }).populate('user');
};

/**
 *
 * @param {ObjectId} userId
 * @param {ObjectId} orgId
 * @param {string} role
 * @returns {Promise<boolean>}
 */
const hasRole = async (userId, orgId, role) => {
  const membership = await Membership.findOne({ user: userId, org: orgId, role });
  return !!membership;
};

module.exports = {
  isUserOwner,
  createMembership,
  queryMemberships,
  getMembershipById,
  updateMembershipById,
  deleteMembershipById,
  getUserMemberships,
  getOrganizationMemberships,
  hasRole,
};
