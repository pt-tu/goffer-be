const httpStatus = require('http-status');
const { Recommendation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new recommendation
 * @param {Object} recommendationBody
 * @returns {Promise<Recommendation>}
 */
const createRecommendation = async (recommendationBody) => {
  return Recommendation.create(recommendationBody);
};

/**
 * Query for recommendations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRecommendations = async (filter, options) => {
  return Recommendation.paginate(filter, options);
};

/**
 * Get recommendation by id
 * @param {ObjectId} id
 * @returns {Promise<Recommendation>}
 */
const getRecommendationById = async (id) => {
  return Recommendation.findById(id);
};

/**
 * Update recommendation by id
 * @param {ObjectId} recommendationId
 * @param {Object} updateBody
 * @returns {Promise<Recommendation>}
 */
const updateRecommendationById = async (recommendationId, updateBody) => {
  const recommendation = await getRecommendationById(recommendationId);
  if (!recommendation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recommendation not found');
  }
  Object.assign(recommendation, updateBody);
  await recommendation.save();
  return recommendation;
};

/**
 * Delete recommendation by id
 * @param {ObjectId} recommendationId
 * @returns {Promise<Recommendation>}
 */
const deleteRecommendationById = async (recommendationId) => {
  const recommendation = await getRecommendationById(recommendationId);
  if (!recommendation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recommendation not found');
  }
  await recommendation.remove();
  return recommendation;
};

module.exports = {
  createRecommendation,
  queryRecommendations,
  getRecommendationById,
  updateRecommendationById,
  deleteRecommendationById,
};
