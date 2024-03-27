const Joi = require('joi');

const createOrganization = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    logo: Joi.string().required(),
    field: Joi.string().required(),
    email: Joi.string().required().email(),
    visibility: Joi.string().required().valid('public', 'private'),
    website: Joi.string().required(),
  }),
};

module.exports = {
  createOrganization,
};
