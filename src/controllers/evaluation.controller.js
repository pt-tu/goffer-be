const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { evaluationService, applyService } = require('../services');

const createEvaluation = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const evaluation = await evaluationService.createEvaluation({ ...req.body, owner: userId });
  const average = await evaluationService.getAverage(req.body.job, req.body.user);
  const application = await applyService.queryApplication(req.body.job, req.body.user);
  await applyService.updateApplicationRaw(application._id, {
    rating: average,
  });
  res.status(httpStatus.CREATED).send(evaluation);
});

const getEvaluations = catchAsync(async (req, res) => {
  const evaluations = await evaluationService.getEvaluations(req.query);
  res.send(evaluations);
});

const getEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.getEvaluationById(req.params.evaluationId);
  res.send(evaluation);
});

const updateEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.updateEvaluationById(req.params.evaluationId, req.body);
  res.send(evaluation);
});

const deleteEvaluation = catchAsync(async (req, res) => {
  const evaluation = await evaluationService.getEvaluationById(req.params.evaluationId);
  if (!evaluation) {
    res.status(httpStatus.NOT_FOUND).send();
  }
  const { job, user } = evaluation;
  await evaluationService.deleteEvaluationById(req.params.evaluationId);
  const average = await evaluationService.getAverage(job, user);
  const application = await applyService.queryApplication(job, user);
  await applyService.updateApplicationRaw(application._id, {
    rating: average,
  });
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
};
