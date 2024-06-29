const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { membershipService, invitationService, notificationService, organizationService } = require('../services');
const ApiError = require('../utils/ApiError');
const { Membership } = require('../models');

const createMembership = catchAsync(async (req, res) => {
  const { user, body } = req;

  const isOwner = await membershipService.isUserOwner(user.id, body.org);
  if (!isOwner) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can add new members');
  }

  const { membership, expires } = await membershipService.createMembership(body);
  const org = await organizationService.getOrganizationById(membership.org);
  await notificationService.createNotification(`notifications-${membership.user.id}`, {
    title: 'New invitation',
    description: `You have a new invitation from ${org.name}`,
    type: 'membership',
    user: membership.user,
    owner: isOwner,
    link: `/invitation/${membership.id}`,
    createAt: new Date(),
  });

  membership.toJSON();
  membership.expires = expires;

  res.status(httpStatus.CREATED).send(membership);
});

const getMemberships = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user', 'org', 'role', 'status', 'title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await membershipService.queryMemberships(filter, options);
  res.send(result);
});

const getMembership = catchAsync(async (req, res) => {
  const membership = await membershipService.getMembershipById(req.params.id);
  res.send(membership);
});

const updateMembership = catchAsync(async (req, res) => {
  const { params, body, user } = req;
  const membership = await membershipService.updateMembershipById(user.id, params.id, body);
  res.send(membership);
});

const deleteMembership = catchAsync(async (req, res) => {
  await membershipService.deleteMembershipById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserMemberships = catchAsync(async (req, res) => {
  const memberships = await membershipService.getUserMemberships(req.params.userId);
  res.send(memberships);
});

const getOrganizationMemberships = catchAsync(async (req, res) => {
  const memberships = await membershipService.getOrganizationMemberships(req.params.orgId);
  res.send(memberships);
});

const acceptInvitation = catchAsync(async (req, res) => {
  const { user } = req;

  const { userId, orgId } = await invitationService.verifyInvitationToken(req.body.token);

  if (userId.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This invitation is not for you');
  }

  const membership = await Membership.findOne({ user: userId, org: orgId });
  if (!membership) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired invitation');
  }

  if (membership.status === 'accepted') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a member of this organization');
  }

  Object.assign(membership, { status: 'accepted' });
  await membership.save();
  await invitationService.deleteInvitationToken(membership.invitationToken);

  res.status(httpStatus.OK).send(membership);
});

const rejectInvitation = catchAsync(async (req, res) => {
  const { user } = req;

  const { userId, orgId } = await invitationService.verifyInvitationToken(req.body.token);

  if (userId.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This invitation is not for you');
  }

  const membership = await Membership.findOne({ user: userId, org: orgId });
  if (!membership || membership.status !== 'sent') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired invitation');
  }

  Object.assign(membership, { status: 'rejected' });
  await membership.save();
  await invitationService.deleteInvitationToken(membership.invitationToken);

  res.status(httpStatus.OK).send(membership);
});

module.exports = {
  createMembership,
  getMemberships,
  getMembership,
  updateMembership,
  deleteMembership,
  getUserMemberships,
  getOrganizationMemberships,
  acceptInvitation,
  rejectInvitation,
};
