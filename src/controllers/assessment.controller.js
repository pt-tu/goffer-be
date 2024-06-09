const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { assessmentService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createAssessment = catchAsync(async (req, res) => {
  const assessment = await assessmentService.createAssessment({
    ...req.body,
    owner: req.user.id,
  });
  res.status(httpStatus.CREATED).send(assessment);
});

const getAssessments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'owner', 'org', 'job', 'status', 'search', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await assessmentService.queryAssessments(filter, options);
  res.send(result);
});

const getAssessment = catchAsync(async (req, res) => {
  const assessment = await assessmentService.getAssessmentById(req.params.assessmentId);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  res.send(assessment);
});

const updateAssessment = catchAsync(async (req, res) => {
  const assessment = await assessmentService.updateAssessmentById(req.params.assessmentId, req.body);
  res.send(assessment);
});

const deleteAssessment = catchAsync(async (req, res) => {
  await assessmentService.deleteAssessmentById(req.params.assessmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
  updateAssessment,
  deleteAssessment,
};
