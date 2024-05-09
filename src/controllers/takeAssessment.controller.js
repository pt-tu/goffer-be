const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const assessmentService = require('../services/assessment.service');
const takeAssessmentService = require('../services/takeAssessment.service');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const startAssessment = catchAsync(async (req, res) => {
  const { user, body } = req;

  const assessment = await assessmentService.getAssessment(body.assessment);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }

  req.body.endingAt = new Date(Date.now() + assessment.duration * 1000);
  req.body.user = user.id;

  const taking = await takeAssessmentService.startAssessment(body);
  res.status(httpStatus.CREATED).send(taking);
});

module.exports = {
  startAssessment,
};
