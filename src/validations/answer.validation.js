const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAnswer = {
  body: Joi.object().keys({
    url: Joi.string().required(),
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

module.exports = {
  createAnswer,
  getAnswers,
  getAnswer,
};
