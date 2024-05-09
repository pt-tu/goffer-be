const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestions = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        content: Joi.string().required(),
        description: Joi.string().required(),
        constraint: Joi.number(),
        type: Joi.string().valid('audio', 'code', 'mcq').required(),
        job: Joi.string().required().custom(objectId),
        sample: Joi.string().when('type', {
          is: 'code',
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
        answer: Joi.string().when('type', {
          is: 'mcq',
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
        order: Joi.number().required(),
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
    order: Joi.number(),
  }),
};

module.exports = {
  createQuestions,
  getQuestions,
};
