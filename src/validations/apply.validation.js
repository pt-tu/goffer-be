const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createApplication = {
  body: Joi.object().keys({
    job: Joi.string().required().custom(objectId),
    owner: Joi.string().custom(objectId),
    status: Joi.string(),
    resume: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required().trim(),
    lastCompany: Joi.string(),
    linkedIn: Joi.string().uri(),
    location: Joi.string(),
    personalWebsite: Joi.string().uri(),
    phoneNumber: Joi.string().required(),
    profilePicture: Joi.string().uri().required(),
    role: Joi.string().required(),
    answers: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getApplications = {
  query: Joi.object().keys({
    job: Joi.string().custom(objectId),
    owner: Joi.string().custom(objectId),
    status: Joi.string(),
    resume: Joi.string(),
    email: Joi.string().email(),
    name: Joi.string().trim(),
    lastCompany: Joi.string(),
    linkedIn: Joi.string().uri(),
    location: Joi.string(),
    personalWebsite: Joi.string().uri(),
    phoneNumber: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getApplication = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateApplication = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    job: Joi.string().custom(objectId),
    status: Joi.string(),
    resume: Joi.string(),
    email: Joi.string().email(),
    name: Joi.string().trim(),
    lastCompany: Joi.string(),
    linkedIn: Joi.string().uri(),
    location: Joi.string(),
    personalWebsite: Joi.string().uri(),
    phoneNumber: Joi.string(),
    profilePicture: Joi.string().uri(),
    role: Joi.string(),
    answers: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
};
