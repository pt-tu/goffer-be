const Joi = require('joi');
const { objectId } = require('./custom.validation');

const startAssessment = {
  body: Joi.object().keys({
    assessment: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  startAssessment,
};
