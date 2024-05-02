const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestions = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        content: Joi.string().required(),
        description: Joi.string().required(),
        constraint: Joi.number(),
        type: Joi.string().required(),
        job: Joi.string().required().custom(objectId),
      })
    )
    .min(1),
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
  createQuestions,
  getQuestions,
};
