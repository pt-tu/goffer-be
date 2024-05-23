const Joi = require('joi');
const { objectId } = require('./custom.validation');

const startAssessment = {
  body: Joi.object().keys({
    assessment: Joi.string().required().custom(objectId),
  }),
};

const getAssessment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const submitAnswer = {
  body: Joi.object().keys({
    takeAssessmentId: Joi.string().required().custom(objectId),
    answer: Joi.object()
      .keys({
        question: Joi.string().required().custom(objectId),
        content: Joi.string().required(),
        point: Joi.number(),
      })
      .required(),
  }),
};

const submitAll = {
  body: Joi.object().keys({
    takeAssessmentId: Joi.string().required().custom(objectId),
    answers: Joi.array()
      .items(
        Joi.object().keys({
          question: Joi.string().required().custom(objectId),
          content: Joi.string().required(),
          point: Joi.number(),
        })
      )
      .required(),
  }),
};

module.exports = {
  startAssessment,
  getAssessment,
  submitAnswer,
  submitAll,
};
