const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Organization } = require('../models');

const createOrganization = async (organizationBody) => {
  if (await Organization.isEmailTaken(organizationBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Corporate email already taken');
  }
  return Organization.create(organizationBody);
};

module.exports = {
  createOrganization,
};
