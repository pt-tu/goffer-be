/* eslint-disable no-param-reassign */
const { v4: uuid } = require('uuid');
const httpStatus = require('http-status');
const { Organization, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');
const { rqs, client } = require('../config/recombeeClient');

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
const queryOrganizations = async (filter, options, advanced) => {
  if (advanced?.searchQuery) {
    filter.$or = [
      { name: { $regex: advanced.searchQuery, $options: 'i' } },
      { field: { $regex: advanced.searchQuery, $options: 'i' } },
      { location: { $regex: advanced.searchQuery, $options: 'i' } },
    ];
  }
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
 * @param {string} domain
 * @returns {Promise<Organization>}
 */
const getOrganizationByDomain = async (domain) => {
  return Organization.findOne({ domain });
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

/**
 *
 * @param {string} user
 * @param {string} org
 * @param {string} member
 * @returns {Promise<Organization>}
 */
const addMember = async (user, org, member) => {
  const organization = await getOrganizationById(org);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  if (organization.owner.toString() !== user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  return userService.updateUserById(member, {
    org,
  });
};

/**
 *
 * @param {string} id
 * @returns {Promise<User[]>}
 */
const getOrganizationMembers = async (id) => {
  return User.find({ org: id });
};

const addOrganizationToRecombee = async (organization) => {
  const req = new rqs.SetItemValues(
    organization.id.toString(),
    {
      name: organization.name,
      description: organization.description,
      field: organization.field,
      location: organization.location,
      website: organization.website,
    },
    {
      cascadeCreate: true,
    }
  );

  await client.send(req);
};

const recommendOrganizations = async (userId, limit = 10, page = 1) => {
  const recommendations = await client.send(
    new rqs.RecommendItemsToUser(userId.toString(), limit, {
      scenario: 'homepage',
      cascadeCreate: true,
      returnProperties: true,
      page,
    })
  );
  const orgIds = recommendations.recomms.map((r) => r.id);
  return Organization.find({ _id: { $in: orgIds } });
};

module.exports = {
  queryOrganizations,
  createOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
  getOrganizationByDomain,
  addMember,
  getOrganizationMembers,
  addOrganizationToRecombee,
  recommendOrganizations,
};
