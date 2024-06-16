const Joi = require('joi');
const { objectId } = require('./custom.validation');

const submitAudioAnswer = {
  body: Joi.object().keys({
    url: Joi.string().required().uri(),
    summary: Joi.string().trim(),
    assessment: Joi.string(),
    question: Joi.string().required().custom(objectId),
    duration: Joi.number().required(),
    apply: Joi.string().custom(objectId),
  }),
};

const getAnswers = {
  query: Joi.object().keys({
    question: Joi.string().custom(objectId),
    owner: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
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

const summarizeAudio = {
  body: Joi.object().keys({
    audioUrl: Joi.string().required().uri(),
  }),
};

module.exports = {
  submitAudioAnswer,
  getAnswers,
  getAnswer,
  submitAssessmentAnswer,
  summarizeAudio,
};
