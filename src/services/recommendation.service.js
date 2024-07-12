const httpStatus = require('http-status');
const { Recommendation } = require('../models');
const ApiError = require('../utils/ApiError');
const notificationService = require('./notification.service');
const userService = require('./user.service');
const logger = require('../config/logger');

/**
 * Create a new recommendation
 * @param {Object} recommendationBody
 * @returns {Promise<Recommendation>}
 */
const createRecommendation = async (recommendationBody) => {
  try {
    const response = await Recommendation.create(recommendationBody);
    const owner = await userService.getUserById(recommendationBody.owner);
    const user = await userService.getUserById(recommendationBody.user);

    await notificationService.createNotification(`notifications-${recommendationBody.user}`, {
      title: 'New recommendation',
      description: `You have a new recommendation from ${user?.name}`,
      type: 'recommendation',
      user,
      owner,
      link: `/app/profile?tab=recommendations`,
      createdAt: new Date(),
    });
    return response;
  } catch (error) {
    logger.error('Error create recommendation');
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Recommendation not created');
  }
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
