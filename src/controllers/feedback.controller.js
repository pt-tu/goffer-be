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

const calculateAggregateInfo = (feedbacks, key) => {
  const categories = feedbacks.reduce((acc, feedback) => {
    if (feedback[key]) {
      if (!acc[feedback[key]]) {
        acc[feedback[key]] = { type: feedback[key], quantity: 0 };
      }
      acc[feedback[key]].quantity += 1;
    }
    return acc;
  }, {});

  const total = feedbacks.filter((feedback) => feedback[key]).length;
  Object.keys(categories).forEach((type) => {
    categories[type].rate = parseFloat(((categories[type].quantity / total) * 100).toFixed(0)); // 0 decimal places
  });

  return Object.values(categories);
};

const getFeedbacks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['job', 'owner', 'sentiment', 'NPS', 'resolved']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await feedbackService.getFeedbacks(filter, options);

  const all = await Feedback.find(filter);
  const sentimentInfo = calculateAggregateInfo(all, 'sentiment');
  const NPSInfo = calculateAggregateInfo(all, 'NPS');

  res.send({ ...result, sentiment: sentimentInfo, NPS: NPSInfo });
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
