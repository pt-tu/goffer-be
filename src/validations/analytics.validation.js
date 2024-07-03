const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getConversionRateData = {
  query: Joi.object().keys({
    job: Joi.string().required().custom(objectId),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    granularity: Joi.string().required().valid('day', 'month', 'year'),
  }),
};

module.exports = {
  getConversionRateData,
};
