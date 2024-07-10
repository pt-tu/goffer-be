const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFeedback = {
  body: Joi.object().keys({
    job: Joi.string().required().custom(objectId),
    feedback: Joi.string().trim(),
    sentiment: Joi.string()
      .required()
      .valid('negative', 'disappointed', 'neutral', 'satisfied', 'very satisfied')
      .lowercase(),
    NPS: Joi.string().required().valid('promoters', 'passives', 'detractors').lowercase(),
    resolved: Joi.boolean(),
  }),
};

const getFeedbacks = {
  query: Joi.object().keys({
    job: Joi.string().custom(objectId).required(),
    owner: Joi.string().custom(objectId),
    sentiment: Joi.string().valid('negative', 'disappointed', 'neutral', 'satisfied', 'very satisfied'),
    NPS: Joi.string().valid('promoters', 'passives', 'detractors'),
    resolved: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getFeedback = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getJobFeedbacks = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateFeedback = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    feedback: Joi.string().trim(),
    sentiment: Joi.string().valid('negative', 'disappointed', 'neutral', 'satisfied', 'very satisfied'),
    NPS: Joi.string().valid('promoters', 'passives', 'detractors'),
    resolved: Joi.boolean(),
  }),
};

const deleteFeedback = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  getJobFeedbacks,
  updateFeedback,
  deleteFeedback,
};
