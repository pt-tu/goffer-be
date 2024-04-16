const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestion = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    description: Joi.string().required(),
    constraint: Joi.number().required(),
    type: Joi.string().required(),
    job: Joi.string().required().custom(objectId),
    author: Joi.string().required().custom(objectId),
  }),
};

const getQuestions = {
  query: Joi.object().keys({
    constraint: Joi.number(),
    type: Joi.string(),
    job: Joi.string().custom(objectId),
    author: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQuestion,
  getQuestions,
};
