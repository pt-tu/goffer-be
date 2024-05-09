const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');
const pick = require('../utils/pick');

const createQuestions = catchAsync(async (req, res) => {
  const questionsBody = req.body;
  const questionsReq = questionsBody.map((question) => {
    return {
      ...question,
      author: req.user._id,
    };
  });
  const questions = await questionService.createQuestions(questionsReq);
  res.status(httpStatus.CREATED).send(questions);
});

const getQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'constraint', 'author', 'job', 'order']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await questionService.queryQuestions(filter, options);
  res.send(result);
});

module.exports = {
  createQuestions,
  getQuestions,
};
