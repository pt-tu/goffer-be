const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const assessmentService = require('../services/assessment.service');
const takeAssessmentService = require('../services/takeAssessment.service');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const startAssessment = catchAsync(async (req, res) => {
  const { user, body } = req;

  const assessment = await assessmentService.getAssessmentById(body.assessment);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }

  req.body.endingAt = new Date(Date.now() + assessment.duration * 1000);
  req.body.user = user.id;

  const taking = await takeAssessmentService.startAssessment(body);
  res.status(httpStatus.CREATED).send(taking);
});

const getTakingAssessmentByAssessmentIdAndUserId = catchAsync(async (req, res) => {
  const { user, query } = req;
  const taking = await takeAssessmentService.getTakingAssessmentByAssessmentIdAndUserId(query.assessment, user.id);
  if (!taking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Taking assessment not found');
  }
  res.send(taking);
});

const getAssessment = catchAsync(async (req, res) => {
  const takeAssessment = await takeAssessmentService.getAssessment(req.params.id);
  if (!takeAssessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Taking assessment not found');
  }
  res.send(takeAssessment);
});

const submitAnswer = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.answer.owner = user.id;

  const taking = await takeAssessmentService.submitAnswer(body.takeAssessmentId, body.answer, user.id);
  res.status(httpStatus.OK).send(taking);
});

const submitAll = catchAsync(async (req, res) => {
  const { user, body } = req;

  const updatedAnswers = body.answers.map((answer) => ({
    ...answer,
    owner: user.id,
  }));

  const taking = await takeAssessmentService.submitAll(body.takeAssessmentId, updatedAnswers, user.id);
  res.status(httpStatus.OK).send(taking);
});

module.exports = {
  startAssessment,
  getAssessment,
  submitAnswer,
  submitAll,
  getTakingAssessmentByAssessmentIdAndUserId,
};
