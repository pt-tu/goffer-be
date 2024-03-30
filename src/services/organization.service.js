const { v4: uuid } = require('uuid');
const httpStatus = require('http-status');
const { Organization } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {Object} organizationBody
 * @returns
 */
const createOrganization = async (organizationBody) => {
  const body = organizationBody;
  body.domain = uuid();
  return Organization.create(body);
};

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
 * @param {string} id
 * @returns {Promise<Organization> }
 */
const getOrganizationById = async (id) => {
  return Organization.findById(id);
};

/**
 *
 * @param {string} id
 * @param {Object} updateBody
 * @param {string} userId
 * @returns {Promise<Organization>}
 */
const updateOrganizationById = async (id, updateBody, userId) => {
  const organization = await getOrganizationById(id);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  if (organization.owner.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  if (await Organization.isDomainTaken(updateBody.domain, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Domain already taken');
  }
  Object.assign(organization, updateBody);
  await organization.save();
  return organization;
};

/**
 *
 * @param {string} id
 * @param {string} userId
 * @returns {Promise<Organization>}
 */
const deleteOrganizationById = async (id, userId) => {
  const organization = await getOrganizationById(id);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  if (organization.owner.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  await organization.remove();
  return organization;
};

module.exports = {
  queryOrganizations,
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
};
