const { v4: uuid } = require('uuid');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { organizationService, paymentService, cacheService } = require('../services');
const config = require('../config/config');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createOrganization = catchAsync(async (req, res) => {
  const sessionRef = uuid();
  const session = await paymentService.createCheckoutSession({
    mode: 'subscription',
    successUrl: `${config.domain}/v1/organizations/verify-creation?session_ref=${sessionRef}`,
    cancelUrl: `${config.client.domain}/organization/new?result=cancel`,
  });
  req.body.owner = req.user.id;
  req.body.sessionId = session.id;
  await cacheService.set(sessionRef, req.body);
  res.send(session);
});

const getOrganizations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'field', 'email', 'visibility', 'domain', 'owner']);
  filter.owner = req.user.id;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organizationService.queryOrganizations(filter, options);
  res.send(result);
});

const verifyCreation = catchAsync(async (req, res) => {
  const { session_ref: sessionRef } = req.query;
  const data = await cacheService.get(sessionRef);
  const session = await paymentService.getCheckoutSession(data.sessionId);
  if (session.payment_status !== 'paid') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment is not completed');
  }
  await cacheService.del(sessionRef);
  if (!data) {
    res.redirect(`${config.client.domain}/organization/new?result=error`);
  }
  const organization = await organizationService.createOrganization(data);
  res.redirect(`${config.client.domain}/organization/new?result=success&name=${organization.name}`);
});

module.exports = {
  createOrganization,
  getOrganizations,
  verifyCreation,
};
