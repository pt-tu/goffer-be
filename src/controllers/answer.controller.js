const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { answerService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const submitAudioAnswer = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const answer = await answerService.createAnswer(body);
  res.status(httpStatus.CREATED).send(answer);
});

const getAnswers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['question', 'owner']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await answerService.queryAnswers(filter, options);
  res.send(result);
});

const getAnswer = catchAsync(async (req, res) => {
  const answer = await answerService.getAnswer(req.params.id);
  if (!answer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
  }
  res.send(answer);
});

const submitAssessmentAnswer = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const answer = await answerService.createAnswer(body);
  res.status(httpStatus.CREATED).send(answer);
});

module.exports = {
  submitAudioAnswer,
  getAnswers,
  getAnswer,
  submitAssessmentAnswer,
};
