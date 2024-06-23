const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { recombeeService } = require('../services');

const getJobRecommendations = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { limit = 10, page = 1 } = req.query;
  const recommendations = await recombeeService.recommendJobs(userId, parseInt(limit, 10), parseInt(page, 10));
  res.send(recommendations);
});

const getOrganizationRecommendations = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { limit = 10, page = 1 } = req.query;
  const recommendations = await recombeeService.recommendOrganizations(userId, parseInt(limit, 10), parseInt(page, 10));
  res.send(recommendations);
});

const getCandidateRecommendations = catchAsync(async (req, res) => {
  const { jobId } = req.params;
  const { limit = 10, page = 1 } = req.query;
  const recommendations = await recombeeService.recommendCandidates(jobId, parseInt(limit, 10), parseInt(page, 10));
  res.send(recommendations);
});

const getUsersRecommendations = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { limit = 10, page = 1 } = req.query;
  const recommendations = await recombeeService.recommendUsers(userId, parseInt(limit, 10), parseInt(page, 10));
  res.send(recommendations);
});

const interactWithItem = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;
  const { interactionType } = req.body;

  await recombeeService.sendInteraction(userId, itemId, interactionType);
  res.status(httpStatus.OK).send({ message: 'Interaction recorded' });
});

module.exports = {
  getJobRecommendations,
  getOrganizationRecommendations,
  getCandidateRecommendations,
  interactWithItem,
  getUsersRecommendations,
};
