const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrganization = {
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
};

module.exports = {
  createOrganization,
};
