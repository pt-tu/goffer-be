const Joi = require('joi');

const createCheckoutSession = {
  body: Joi.object().keys({
    mode: Joi.string().required().valid('subscription'),
    successUrl: Joi.string().required(),
    cancelUrl: Joi.string().required(),
  }),
};

module.exports = {
  createCheckoutSession,
};
