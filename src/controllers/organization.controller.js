const { v4: uuid } = require('uuid');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { organizationService, paymentService, cacheService } = require('../services');
const config = require('../config/config');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

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
  logger.debug(`Organizations: ${result.results.length}`);
  res.send(result);
});

const getOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.getOrganizationById(req.params.organizationId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  res.send(organization);
});

const getOrganizationByDomain = catchAsync(async (req, res) => {
  const organization = await organizationService.getOrganizationByDomain(req.params.domain);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  res.send(organization);
});

const updateOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.updateOrganizationById(req.params.organizationId, req.body, req.user.id);
  res.send(organization);
});

const deleteOrganization = catchAsync(async (req, res) => {
  await organizationService.deleteOrganizationById(req.params.organizationId, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
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
  res.redirect(
    `${config.client.domain}/organization/new?result=success&name=${organization.name}&domain=${organization.domain}`
  );
});

const getSourcing = catchAsync(async (req, res) => {
  const sourcing = await organizationService.getSourcing(req.params.organizationId);
  res.send(sourcing);
});

module.exports = {
  createOrganization,
  getOrganizations,
  verifyCreation,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationByDomain,
  getSourcing,
};
