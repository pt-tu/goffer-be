const { v4: uuid } = require('uuid');
const catchAsync = require('../utils/catchAsync');
const { organizationService, paymentService, cacheService } = require('../services');
const config = require('../config/config');

const createOrganization = catchAsync(async (req, res) => {
  const sessionRef = uuid();
  const session = await paymentService.createCheckoutSession({
    mode: 'subscription',
    successUrl: `${config.domain}/v1/organizations/verify-creation?session_ref=${sessionRef}`,
    cancelUrl: `${config.client.domain}/organization/new?result=cancel`,
  });
  await cacheService.set(sessionRef, req.body);
  res.send(session);
});

const verifyCreation = catchAsync(async (req, res) => {
  const { session_ref: sessionRef } = req.query;
  const organizationBody = await cacheService.get(sessionRef);
  await cacheService.del(sessionRef);
  if (!organizationBody) {
    res.redirect(`${config.client.domain}/organization/new?result=error`);
  }
  const organization = await organizationService.createOrganization(organizationBody);
  res.redirect(`${config.client.domain}/organization/new?result=success&name=${organization.name}`);
});

module.exports = {
  createOrganization,
  verifyCreation,
};
