const { Organization } = require('../models');

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrganizations = async (filter, options) => {
  const organizations = await Organization.paginate(filter, options);
  return organizations;
};

/**
 *
 * @param {Object} organizationBody
 * @returns
 */
const createOrganization = async (organizationBody) => {
  return Organization.create(organizationBody);
};

module.exports = {
  queryOrganizations,
  createOrganization,
};
