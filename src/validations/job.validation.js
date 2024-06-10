const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required().min(200),
    location: Joi.string().required(),
    salaryFrom: Joi.string().required(),
    salaryTo: Joi.string(),
    experience: Joi.string().required(),
    skills: Joi.array().items(Joi.string()).max(3).min(1).required(),
    tools: Joi.array().items(Joi.string()).max(7).min(1).required(),
    slots: Joi.number().required(),
    time: Joi.string().required(),
    workingHours: Joi.number().required(),
    org: Joi.string().required().custom(objectId),
    benefits: Joi.array().items(Joi.string()).max(7),
    pipeline: Joi.array().items(Joi.string()).max(7).required(),
    questions: Joi.array().items(Joi.string()).max(10).required(),
    assessments: Joi.array().items(Joi.string()).max(5),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    salaryFrom: Joi.string(),
    salaryTo: Joi.string(),
    experience: Joi.string(),
    skills: Joi.array().items(Joi.string()),
    tools: Joi.array().items(Joi.string()),
    slots: Joi.number(),
    time: Joi.string(),
    workingHours: Joi.number(),
    org: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    status: Joi.string().valid('unpublished', 'published', 'closed', 'expired'),
  }),
};

const getJob = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateJob = {
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string().min(200),
      location: Joi.string(),
      salaryFrom: Joi.string(),
      salaryTo: Joi.string(),
      experience: Joi.string(),
      skills: Joi.array().items(Joi.string()).max(3).min(1),
      tools: Joi.array().items(Joi.string()).max(7).min(1),
      slots: Joi.number(),
      time: Joi.string(),
      workingHours: Joi.number(),
      org: Joi.string().custom(objectId),
      benefits: Joi.array().items(Joi.string()).max(7),
      pipeline: Joi.array().items(Joi.string()).max(7),
      questions: Joi.array().items(Joi.string()).max(10),
      hasFeedback: Joi.boolean(),
      status: Joi.string().valid('unpublished', 'published', 'closed', 'expired'),
      assessments: Joi.array().items(Joi.string()).max(5),
    })
    .min(1), // Ensure at least one field is provided for update
};

const deleteJob = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
