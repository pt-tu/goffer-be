const Joi = require('joi');
const { objectId } = require('./custom.validation');

const submitAudioAnswer = {
  body: Joi.object().keys({
    url: Joi.string().required().uri(),
    summary: Joi.string().trim(),
    assessment: Joi.string(),
    question: Joi.string().required().custom(objectId),
    duration: Joi.number().required(),
  }),
};

const getAnswers = {
  query: Joi.object().keys({
    question: Joi.string().custom(objectId),
    owner: Joi.string().custom(objectId),
  }),
};

const getAnswer = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const submitAssessmentAnswer = {
  body: Joi.object().keys({
    question: Joi.string().required().custom(objectId),
    content: Joi.string().required(),
    point: Joi.number(),
  }),
};

module.exports = {
  submitAudioAnswer,
  getAnswers,
  getAnswer,
  submitAssessmentAnswer,
};
