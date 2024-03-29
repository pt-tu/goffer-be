const { Organization } = require('../models');

const createOrganization = async (organizationBody) => {
  return Organization.create(organizationBody);
};

module.exports = {
  createOrganization,
};
