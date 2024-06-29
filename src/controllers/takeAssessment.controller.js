const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const assessmentService = require('../services/assessment.service');
const takeAssessmentService = require('../services/takeAssessment.service');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { applyService } = require('../services');

const startAssessment = catchAsync(async (req, res) => {
  const { user, body } = req;

  const assessment = await assessmentService.getAssessmentById(body.assessment);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }

  req.body.endingAt = new Date(Date.now() + assessment.duration * 1000 * 60);
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

  const taking = await takeAssessmentService.submitAll(body.takeAssessmentId, user.id);
  const takings = await takeAssessmentService.queryTakingAssessment({ user: user.id, assessment: taking.assessment.id });
  let totalScore = 0;
  for (let i = 0; i < takings.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const score = await assessmentService.calculateScores(takings[i].assessment, takings[i].answers);
    totalScore += score;
  }

  const assessmentAvg = totalScore / (takings.length || 1);

  const application = await applyService.queryApplication(taking.assessment.job, user.id);
  await applyService.updateApplicationRaw(application._id, { assessmentAvg });
  res.status(httpStatus.OK).send(taking);
});

module.exports = {
  startAssessment,
  getAssessment,
  submitAnswer,
  submitAll,
  getTakingAssessmentByAssessmentIdAndUserId,
};
