const Joi = require('joi');

const getOrganizations = {
  query: Joi.object().keys({
    name: Joi.string(),
    field: Joi.string(),
    email: Joi.string().email(),
    visibility: Joi.string().valid('public', 'private'),
    domain: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

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
  getOrganizations,
  createOrganization,
};
