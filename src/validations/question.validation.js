const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestion = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    description: Joi.string().required().max(10000),
    constraint: Joi.number(),
    type: Joi.string().required(),
    sample: Joi.string(),
    answer: Joi.string(),
    choices: Joi.array().items(
      Joi.object().keys({
        content: Joi.string().required(),
        image: Joi.string().allow(''),
        isCorrect: Joi.boolean().default(false),
      })
    ),
    difficulty: Joi.number().valid(1, 2, 3),
    kind: Joi.string().valid('audio', 'video').default('audio'),
    org: Joi.string().required().custom(objectId),
    image: Joi.string().allow(''),
    category: Joi.string().required(),
    gradingInput: Joi.string().when('type', {
      is: 'coding',
      then: Joi.required(),
    }),
    gradingOutput: Joi.string().when('type', {
      is: 'coding',
      then: Joi.required(),
    }),
    exampleInput: Joi.string().when('type', {
      is: 'coding',
      then: Joi.required(),
    }),
    exampleOutput: Joi.string().when('type', {
      is: 'coding',
      then: Joi.required(),
    }),
    numberOfTestCaseLines: Joi.number().min(1).when('type', {
      is: 'coding',
      then: Joi.required(),
    }),
    numberOfOutputLines: Joi.number().min(1).when('type', {
      is: 'coding',
      then: Joi.required(),
    }),
  }),
};

const getQuestions = {
  query: Joi.object().keys({
    type: Joi.string(),
    job: Joi.string().custom(objectId),
    author: Joi.string().custom(objectId),
    difficulty: Joi.number().valid(1, 2, 3),
    org: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    search: Joi.string(),
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
      description: Joi.string().max(10000),
      constraint: Joi.number(),
      type: Joi.string(),
      job: Joi.string().custom(objectId),
      author: Joi.string().custom(objectId),
      sample: Joi.string(),
      answer: Joi.string(),
      order: Joi.number(),
      difficulty: Joi.number().valid(1, 2, 3),
      choices: Joi.array().items(
        Joi.object().keys({
          content: Joi.string().required(),
          image: Joi.string().allow(''),
          isCorrect: Joi.boolean().default(false),
        })
      ),
      kind: Joi.string().valid('audio', 'video').default('audio'),
      image: Joi.string().allow(''),
      category: Joi.string().required(),
      gradingInput: Joi.string(),
      gradingOutput: Joi.string(),
      exampleInput: Joi.string(),
      exampleOutput: Joi.string(),
      numberOfTestCaseLines: Joi.number().min(1),
      numberOfOutputLines: Joi.number().min(1),
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
