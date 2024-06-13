const Joi = require('joi');

const generateResponse = {
  body: Joi.object().keys({
    prompt: Joi.string().required().min(1),
    systemMessage: Joi.string().optional(),
  }),
};

module.exports = { generateResponse };
