const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAssessment = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    questions: Joi.array().items(Joi.string().custom(objectId)).min(1).required(),
    duration: Joi.number().required(),
    job: Joi.string().custom(objectId),
    order: Joi.number().required(),
  }),
};

const getAssessments = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    questions: Joi.array().items(Joi.string().custom(objectId)).min(1),
    duration: Joi.number(),
    job: Joi.string().custom(objectId),
    order: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getAssessment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
};
