const Joi = require('joi');

const createReport = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().default('pending'),
    image: Joi.string().required(),
    relatedPath: Joi.string().required(),
    environment: Joi.object()
      .keys({
        os: Joi.string().required(),
        browserName: Joi.string().required(),
        browserVersion: Joi.string().required(),
        canvasSize: Joi.string().required(),
      })
      .required(),
  }),
};

module.exports = {
  createReport,
};
