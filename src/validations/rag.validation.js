// validations/pdfValidation.js

const Joi = require('joi');

const processPDFSchema = {
  body: Joi.object({
    filePath: Joi.string().required(),
  }),
};

const processMarkdownSchema = {
  body: Joi.object({
    filePath: Joi.string().required(),
  }),
};

const conductQuerySchema = {
  query: Joi.object({
    query: Joi.string().required(),
  }),
};

const chatSchema = {
  body: Joi.object({
    messages: Joi.array().items(Joi.any()).required(),
  }),
};

const parsePDF = {
  body: Joi.object({
    fileUrl: Joi.string().required(),
  }),
};

module.exports = {
  processPDFSchema,
  processMarkdownSchema,
  chatSchema,
  conductQuerySchema,
  parsePDF,
};
