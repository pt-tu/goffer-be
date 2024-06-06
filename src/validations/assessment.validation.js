const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAssessment = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    questions: Joi.array().items(Joi.string().custom(objectId)).required(),
    duration: Joi.number().required(),
    owner: Joi.string().required().custom(objectId),
    org: Joi.string().required().custom(objectId),
    job: Joi.string().required().custom(objectId),
    order: Joi.number().required(),
    status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
  }),
};

const getAssessments = {
  query: Joi.object().keys({
    title: Joi.string(),
    owner: Joi.string().custom(objectId),
    org: Joi.string().custom(objectId),
    job: Joi.string().custom(objectId),
    status: Joi.string().valid('draft', 'published', 'archived'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAssessment = {
  params: Joi.object().keys({
    assessmentId: Joi.string().custom(objectId),
  }),
};

const updateAssessment = {
  params: Joi.object().keys({
    assessmentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      questions: Joi.array().items(Joi.string().custom(objectId)),
      duration: Joi.number(),
      owner: Joi.string().custom(objectId),
      org: Joi.string().custom(objectId),
      job: Joi.string().custom(objectId),
      order: Joi.number(),
      status: Joi.string().valid('draft', 'published', 'archived'),
    })
    .min(1),
};

const deleteAssessment = {
  params: Joi.object().keys({
    assessmentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
  updateAssessment,
  deleteAssessment,
};
