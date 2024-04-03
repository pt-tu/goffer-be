const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    salaryFrom: Joi.string().required(),
    salaryTo: Joi.string(),
    experience: Joi.string().required(),
    skills: Joi.array().items(Joi.string()).max(3).required(),
    tools: Joi.array().items(Joi.string()).max(7).required(),
    slots: Joi.number().required(),
    time: Joi.string().required(),
    workingHours: Joi.number().required(),
    orgId: Joi.string().required().custom(objectId),
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
    orgId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

module.exports = {
  createJob,
  getJobs,
};
