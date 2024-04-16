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
    org: Joi.string().required().custom(objectId),
    benefits: Joi.array().items(Joi.string()).max(7),
    pipeline: Joi.array().items(Joi.string()).max(7).required(),
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
  }),
};

const updateJob = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    location: Joi.string().optional(),
    salaryFrom: Joi.string().optional(),
    salaryTo: Joi.string().allow(null).optional(),
    experience: Joi.string().optional(),
    skills: Joi.array().items(Joi.string()).max(3).optional(),
    tools: Joi.array().items(Joi.string()).max(7).optional(),
    slots: Joi.number().optional(),
    time: Joi.string().optional(),
    workingHours: Joi.number().optional(),
    org: Joi.string().custom(objectId).optional(),
    benefits: Joi.array().items(Joi.string()).max(7).optional(),
    pipeline: Joi.array().items(Joi.string()).max(7).optional(),
  }),
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
};
