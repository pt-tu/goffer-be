const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const feedbackService = require('../services/feedback.service');
const Feedback = require('../models/feedback.model');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createFeedback = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const feedback = await feedbackService.createFeedback(body);
  res.status(httpStatus.CREATED).send(feedback);
});

const getFeedbacks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['job', 'owner', 'sentiment', 'NPS', 'resolved']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await feedbackService.getFeedbacks(filter, options);
  res.send(result);
});

const getFeedback = catchAsync(async (req, res) => {
  const feedback = await feedbackService.getFeedback(req.params.id);
  if (!feedback) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  res.send(feedback);
});

const updateFeedback = catchAsync(async (req, res) => {
  const { user, body } = req;

  const check = await Feedback.findById(req.params.id);
  if (!check) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  if (check.owner.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const feedback = await feedbackService.updateFeedback(req.params.id, body);
  res.status(httpStatus.OK).send(feedback);
});

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
};
