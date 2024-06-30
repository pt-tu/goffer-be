const { Evaluation } = require('../models');

const updateEvaluationById = async (evaluationId, updateData) => {
  return Evaluation.findByIdAndUpdate(evaluationId, updateData, { new: true });
};

const createEvaluation = async (evaluationData) => {
  const { owner, answer } = evaluationData;
  const exitedEvaluation = await Evaluation.findOne({
    owner,
    answer,
  });
  if (!exitedEvaluation) {
    return Evaluation.create(evaluationData);
  }

  return updateEvaluationById(exitedEvaluation._id, evaluationData);
};

const getEvaluations = async (filter) => {
  return Evaluation.find(filter);
};

const getEvaluationById = async (evaluationId) => {
  return Evaluation.findById(evaluationId);
};

const deleteEvaluationById = async (evaluationId) => {
  return Evaluation.findByIdAndDelete(evaluationId);
};

const getAverage = async (job, userId) => {
  const evaluations = await Evaluation.find({ user: userId, job });
  const totalScore = evaluations.reduce((acc, evaluation) => acc + evaluation.score, 0);
  return totalScore / evaluations.length;
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluationById,
  deleteEvaluationById,
  getAverage,
};
