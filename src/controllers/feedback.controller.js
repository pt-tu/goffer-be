const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const feedbackService = require('../services/feedback.service');
const Feedback = require('../models/feedback.model');
const Apply = require('../models/apply.model');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { membershipService } = require('../services');
const { Job } = require('../models');

const createFeedback = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const feedback = await feedbackService.createFeedback(body);
  res.status(httpStatus.CREATED).send(feedback);
});

const getAggregateInfo = (feedbacks, key) => {
  const summary = feedbacks.reduce((acc, feedback) => {
    if (feedback[key]) {
      const value = feedback[key].toLowerCase();
      if (!acc[value]) {
        acc[value] = { quantity: 0, rate: 0 };
      }
      acc[value].quantity += 1;
    }
    return acc;
  }, {});

  const total = Object.values(summary).reduce((acc, { quantity }) => acc + quantity, 0);
  const keys = Object.keys(summary);

  const getScore = (type) => {
    switch (type) {
      case 'negative':
        return 1;
      case 'disappointed':
        return 2;
      case 'neutral':
        return 3;
      case 'satisfied':
        return 4;
      case 'very satisfied':
        return 5;
      default:
        return 0;
    }
  };
  let totalScore = 0;
  keys.forEach((type) => {
    summary[type].rate = parseFloat(((summary[type].quantity / total) * 100).toFixed(0)); // 0 decimal places
    totalScore += getScore(type) * summary[type].quantity;
  });

  const res = {
    total,
  };

  switch (key) {
    case 'sentiment':
      res.average = parseFloat((totalScore / total).toFixed(1));
      break;
    case 'NPS':
      res.NPS = (summary.promoters?.rate ?? 0) - (summary.detractors?.rate ?? 0);
      break;
    default:
      break;
  }

  keys.forEach((type) => {
    res[type] = {
      quantity: summary[type].quantity,
      rate: summary[type].rate,
    };
  });

  return res;
};

const getFeedbacks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['job', 'owner', 'sentiment', 'NPS', 'resolved']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await feedbackService.getFeedbacks(filter, options);

  const all = await Feedback.find(filter);
  const sentiment = getAggregateInfo(all, 'sentiment');
  const NPS = getAggregateInfo(all, 'NPS');
  const candidates = (await Apply.find({ job: req.query.job })).length ?? 0;

  res.send({ ...result, sentiment, NPS, candidates });
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

  const isOnlyResolvedUpdate = Object.keys(body).length === 1 && 'resolved' in body;
  const job = await Job.findById(check.job);
  const canUpdate =
    (isOnlyResolvedUpdate && (await membershipService.isUserOwner(user.id, job.org))) || check.owner.toString() === user.id;

  if (!canUpdate) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const feedback = await feedbackService.updateFeedback(req.params.id, body);
  res.status(httpStatus.OK).send(feedback);
});

const deleteFeedback = catchAsync(async (req, res) => {
  const { user, params } = req;

  const check = await Feedback.findById(params.id);
  if (!check) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
  }

  const job = await Job.findById(check.job);
  const canDelete = (await membershipService.isUserOwner(user.id, job.org)) || check.owner.toString() === user.id;

  if (!canDelete) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const feedback = await feedbackService.deleteFeedback(req.params.id);
  res.status(httpStatus.OK).send(feedback);
});

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
