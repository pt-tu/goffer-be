const httpStatus = require('http-status');
const { Assessment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an assessment
 * @param {Object} assessmentBody
 * @returns {Promise<Assessment>}
 */
const createAssessment = async (assessmentBody) => {
  return Assessment.create(assessmentBody);
};

/**
 * Query for assessments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAssessments = async (filter, options) => {
  const finalFilter = { ...filter, ...(filter.search && { title: { $regex: filter.search, $options: 'i' } }) };
  delete finalFilter.search;
  const assessments = await Assessment.paginate(finalFilter, options);
  return assessments;
};

/**
 * Get assessment by id
 * @param {ObjectId} id
 * @returns {Promise<Assessment>}
 */
const getAssessmentById = async (id) => {
  return Assessment.findById(id).populate('questions').populate('job');
};

/**
 * Update assessment by id
 * @param {ObjectId} assessmentId
 * @param {Object} updateBody
 * @returns {Promise<Assessment>}
 */
const updateAssessmentById = async (assessmentId, updateBody) => {
  const assessment = await getAssessmentById(assessmentId);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  Object.assign(assessment, updateBody);
  await assessment.save();
  return assessment;
};

/**
 * Delete assessment by id
 * @param {ObjectId} assessmentId
 * @returns {Promise<Assessment>}
 */
const deleteAssessmentById = async (assessmentId) => {
  const assessment = await getAssessmentById(assessmentId);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  await assessment.remove();
  return assessment;
};

module.exports = {
  createAssessment,
  queryAssessments,
  getAssessmentById,
  updateAssessmentById,
  deleteAssessmentById,
};
