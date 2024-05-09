const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const assessmentService = require('../services/assessment.service');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createAssessment = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const assessment = await assessmentService.createAssessment(body);
  res.status(httpStatus.CREATED).send(assessment);
});

const getAssessments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'description', 'duration', 'owner', 'job']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await assessmentService.getAssessments(filter, options);
  res.send(result);
});

const getAssessment = catchAsync(async (req, res) => {
  const assessment = await assessmentService.getAssessment(req.params.id);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(assessment);
});

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
};
