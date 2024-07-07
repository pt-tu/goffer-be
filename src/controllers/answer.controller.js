const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { answerService, applyService, questionService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { Answer } = require('../models');

const submitAudioAnswer = catchAsync(async (req, res) => {
  const { user, body } = req;
  const { apply, ...answerData } = body;
  const { transcript, summary } = await answerService.summarizeAudio(body.url);

  const question = await questionService.getQuestionById(answerData.question);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  const application = await applyService.getApplication(apply);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  const assessment = await answerService.analyzeSentiment(transcript, question.content, application.job);
  const answer = await Answer.findOneAndUpdate(
    { owner: user.id, question: body.question, ref: apply },
    { ...answerData, owner: user.id, ref: apply, content: transcript.text, summary, assessment },
    { upsert: true, new: true }
  );

  if (apply) {
    await applyService.submitAnswerToApplication(body.apply, answer);
  }

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

const summarizeAudio = catchAsync(async (req, res) => {
  const { audioUrl } = req.body;
  const { summary } = await answerService.summarizeAudio(audioUrl);
  res.send({
    result: summary,
  });
});

const getApplyAnswer = catchAsync(async (req, res) => {
  const { user, params } = req;
  const { applicationId, questionId } = params;

  const answer = await answerService.getApplyAnswer(user.id, applicationId, questionId);

  res.send(answer);
});

module.exports = {
  submitAudioAnswer,
  getAnswers,
  getAnswer,
  submitAssessmentAnswer,
  summarizeAudio,
  getApplyAnswer,
};
