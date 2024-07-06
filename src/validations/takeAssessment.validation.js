const Joi = require('joi');
const { objectId } = require('./custom.validation');

const startAssessment = {
  body: Joi.object().keys({
    assessment: Joi.string().required().custom(objectId),
  }),
};

const getAssessment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const submitAnswer = {
  body: Joi.object().keys({
    takeAssessmentId: Joi.string().required().custom(objectId),
    answer: Joi.object()
      .keys({
        question: Joi.string().required().custom(objectId),
        content: Joi.string().required(),
        point: Joi.number(),
        ref: Joi.string().required(),
        lang: Joi.number(),
      })
      .required(),
  }),
};

const submitAll = {
  body: Joi.object().keys({
    takeAssessmentId: Joi.string().required().custom(objectId),
  }),
};

const getTakingAssessmentByAssessmentIdAndUserId = {
  query: Joi.object().keys({
    assessment: Joi.string().required().custom(objectId),
  }),
};

const getTakingAssessments = {
  query: Joi.object().keys({
    assessment: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    populate: Joi.string(),
  }),
};

module.exports = {
  startAssessment,
  getAssessment,
  submitAnswer,
  submitAll,
  getTakingAssessmentByAssessmentIdAndUserId,
  getTakingAssessments,
};
