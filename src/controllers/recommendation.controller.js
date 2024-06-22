const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { recommendationService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createRecommendation = catchAsync(async (req, res) => {
  const recommendation = await recommendationService.createRecommendation({
    ...req.body,
    owner: req.user.id,
  });
  res.status(httpStatus.CREATED).send(recommendation);
});

const getRecommendations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user', 'isHide']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await recommendationService.queryRecommendations(filter, options);
  res.send(result);
});

const getRecommendation = catchAsync(async (req, res) => {
  const recommendation = await recommendationService.getRecommendationById(req.params.id);
  if (!recommendation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recommendation not found');
  }
  res.send(recommendation);
});

const updateRecommendation = catchAsync(async (req, res) => {
  const recommendation = await recommendationService.updateRecommendationById(req.params.id, req.body);
  res.send(recommendation);
});

const deleteRecommendation = catchAsync(async (req, res) => {
  await recommendationService.deleteRecommendationById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRecommendation,
  getRecommendations,
  getRecommendation,
  updateRecommendation,
  deleteRecommendation,
};
