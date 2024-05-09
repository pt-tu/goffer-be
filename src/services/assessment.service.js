const httpStatus = require('http-status');
const Assessment = require('../models/assessment.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {Assessment} body
 * @returns {Promise<Assessment>}
 */
const createAssessment = async (body) => {
  const user = await User.findById(body.owner);

  if (user.initialType !== 'organization') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const assessment = await Assessment.create(body);
  return assessment;
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAssessments = async (filter, options) => {
  const assessments = await Assessment.paginate(filter, options);
  return assessments;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Assessment>}
 */
const getAssessment = async (id) => {
  let assessment = await Assessment.findById(id).populate('questions').populate('owner').populate('job');
  assessment = assessment.toJSON();
  return assessment;
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
};
