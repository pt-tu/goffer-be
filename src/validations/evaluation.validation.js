const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvaluation = {
  body: Joi.object().keys({
    answer: Joi.string().custom(objectId).required(),
    score: Joi.number().valid(1, 2, 3, 4, 5).required(),
    timestamp: Joi.number().required(),
    job: Joi.string().custom(objectId).required(),
    user: Joi.string().custom(objectId).required(),
  }),
};

const getEvaluations = {
  query: Joi.object().keys({
    owner: Joi.string().custom(objectId),
    answer: Joi.string().custom(objectId),
    score: Joi.number().valid(1, 2, 3, 4, 5),
    timestamp: Joi.number(),
    job: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
  }),
};

const getEvaluation = {
  params: Joi.object().keys({
    evaluationId: Joi.string().custom(objectId).required(),
  }),
};

const updateEvaluation = {
  params: Joi.object().keys({
    evaluationId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      score: Joi.number().valid(1, 2, 3, 4, 5),
    })
    .min(1),
};

const deleteEvaluation = {
  params: Joi.object().keys({
    evaluationId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  deleteEvaluation,
};
