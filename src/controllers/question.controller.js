const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');
const pick = require('../utils/pick');

const createQuestion = catchAsync(async (req, res) => {
  const questionBody = req.body;
  questionBody.author = req.user._id;
  const question = await questionService.createJob(questionBody);
  res.status(httpStatus.CREATED).send(question);
});

const getQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'constraint', 'author', 'job']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await questionService.queryQuestions(filter, options);
  res.send(result);
});

module.exports = {
  createQuestion,
  getQuestions,
};
