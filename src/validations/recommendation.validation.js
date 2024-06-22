const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRecommendation = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId).required(),
    content: Joi.string().required(),
    isHide: Joi.boolean(),
  }),
};

const getRecommendations = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    isHide: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getRecommendation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateRecommendation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      user: Joi.string().custom(objectId),
      content: Joi.string(),
      isHide: Joi.boolean(),
      owner: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteRecommendation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createRecommendation,
  getRecommendations,
  getRecommendation,
  updateRecommendation,
  deleteRecommendation,
};
