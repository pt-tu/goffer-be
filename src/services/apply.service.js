const httpStatus = require('http-status');
const Apply = require('../models/apply.model');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {Apply} applyBody
 * @returns {Promise<Apply>}
 */
const createApplication = async (applyBody) => {
  const application = await Apply.create(applyBody);
  return application;
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Apply>}
 */
const getApplications = async (filter, options) => {
  const applications = await Apply.paginate(filter, options);
  return applications;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Apply>}
 */
const getApplication = async (id) => {
  let application = await Apply.findById(id).populate('owner').populate('job').populate('answers');
  application = application.toJSON();
  return application;
};

/**
 *
 * @param {string} id
 * @param {Apply} applyBody
 * @returns {Promise<Apply>}
 */
const updateApplication = async (id, applyBody) => {
  const application = await Apply.findById(id);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  Object.assign(application, applyBody);
  await application.save();
  return application;
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
};