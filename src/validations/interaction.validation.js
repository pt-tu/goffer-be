const Joi = require('joi');
const { objectId } = require('./custom.validation');

const toggleInteraction = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  toggleInteraction,
};
