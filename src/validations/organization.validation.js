const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getOrganizations = {
  query: Joi.object().keys({
    name: Joi.string(),
    field: Joi.string(),
    location: Joi.string(),
    email: Joi.string().email(),
    visibility: Joi.string().valid('public', 'private'),
    domain: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getByDomain = {
  params: Joi.object().keys({
    domain: Joi.string().required(),
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

const getOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
};

const updateOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    logo: Joi.string(),
    field: Joi.string(),
    location: Joi.string(),
    email: Joi.string().email(),
    visibility: Joi.string().valid('public', 'private'),
    website: Joi.string(),
    domain: Joi.string(),
  }),
};

const deleteOrganization = {
  params: Joi.object().keys({
    organizationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganization,
  getByDomain,
};
