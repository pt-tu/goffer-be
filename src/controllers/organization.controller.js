const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { organizationService } = require('../services');

const createOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.createOrganization(req.body);
  res.status(httpStatus.CREATED).send(organization);
});

module.exports = {
  createOrganization,
};
