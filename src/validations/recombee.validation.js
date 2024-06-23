const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getRecommendations = {
  query: Joi.object().keys({
    limit: Joi.number().integer().min(1).default(10),
    page: Joi.number().integer().min(1).default(1),
  }),
};

const interactWithItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    interactionType: Joi.string().valid('view', 'like').required(),
  }),
};

module.exports = {
  getRecommendations,
  interactWithItem,
};
