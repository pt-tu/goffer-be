const httpStatus = require('http-status');
const console = require('console');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { membershipService, invitationService, tokenService } = require('../services');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { Membership } = require('../models');

const createMembership = catchAsync(async (req, res) => {
  const { user, body } = req;

  const isOwner = await membershipService.isUserOwner(user.id, body.org);
  if (isOwner) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner can add new members');
  }

  const { membership, expires } = await membershipService.createMembership(body);

  const invitationLink = `${config.domain}/v1/memberships/${membership.invitationToken}`;
  // ... (gửi thông báo với invitationLink)

  res.status(httpStatus.CREATED).send({ message: 'Invitation sent successfully', invitationLink, expires });
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

  const invitation = await invitationService.verifyInvitationToken(req.params.invitationToken);
  const { userId, org } = invitation;
  console.log('🚀 ~ file: membership.controller.js:87 ~ rejectInvitation ~ userId, orgId:', invitation);

  if (userId.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This invitation is not for you');
  }

  const membership = await Membership.findOne({ user: userId, org });
  if (!membership || membership.status !== 'sent') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired invitation');
  }

  if (membership.status === 'accepted') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are already a member of this organization');
  }

  await membershipService.updateMembershipById(membership.id, { status: 'accepted' });
  await tokenService.updateInvitationToken(membership.invitationToken, { blacklisted: true });

  res.status(httpStatus.OK).send({ message: 'Invitation accepted successfully' });
});

const rejectInvitation = catchAsync(async (req, res) => {
  const { invitationToken } = req.params;
  const { user } = req;

  const { userId, org } = await invitationService.verifyInvitationToken(invitationToken);

  if (userId.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This invitation is not for you');
  }

  const membership = await Membership.findOne({ user: userId, org });
  if (!membership || membership.status !== 'sent') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid or expired invitation');
  }

  await membershipService.updateMembershipById(membership.id, { status: 'rejected' });
  await tokenService.updateInvitationToken(membership.invitationToken, { blacklisted: true });

  res.status(httpStatus.OK).send({ message: 'Invitation rejected' });
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
