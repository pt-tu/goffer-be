const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestion = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    description: Joi.string().required(),
    constraint: Joi.number().min(180).default(180),
    type: Joi.string().required(),
    job: Joi.string().required().custom(objectId),
    author: Joi.string().required().custom(objectId),
    sample: Joi.string(),
    answer: Joi.string(),
    order: Joi.number().required(),
    difficulty: Joi.number().valid(1, 2, 3).default(1),
    kind: Joi.string().valid('audio', 'video').default('audio'),
    org: Joi.string().required().custom(objectId),
  }),
};

const getQuestions = {
  query: Joi.object().keys({
    content: Joi.string(),
    type: Joi.string(),
    job: Joi.string().custom(objectId),
    author: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

const updateQuestion = {
  params: Joi.object().keys({
    questionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string(),
      description: Joi.string(),
      constraint: Joi.number().min(180),
      type: Joi.string(),
      job: Joi.string().custom(objectId),
      author: Joi.string().custom(objectId),
      sample: Joi.string(),
      answer: Joi.string(),
      order: Joi.number(),
      difficulty: Joi.number().valid(1, 2, 3),
    })
    .min(1),
};

const deleteQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
