const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createApply = {
  body: Joi.object().keys({
    job: Joi.string().required().custom(objectId),
    applicant: Joi.string().required().custom(objectId),
    status: Joi.string(),
    resume: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().trim(),
    lastCompany: Joi.string(),
    linkedIn: Joi.string().uri(),
    location: Joi.string(),
    website: Joi.string().uri(),
    phone: Joi.string(),
    profilePicture: Joi.string().uri(),
    role: Joi.string().required(),
    answers: Joi.array().items(Joi.string()),
  }),
};

const getApply = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createApply,
  getApply,
};
