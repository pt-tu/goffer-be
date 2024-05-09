const httpStatus = require('http-status');
const TakeAssessment = require('../models/takeAssessment.model');
const Answer = require('../models/answer.model');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {TakeAssessment} body
 * @returns {Promise<TakeAssessment>}
 */
const startAssessment = async (body) => {
  let takeAssessment = await TakeAssessment.create(body);

  takeAssessment = await takeAssessment
    .populate('user')
    .populate({
      path: 'assessment',
      populate: {
        path: 'questions',
      },
    })
    .populate('answers')
    .execPopulate();

  return takeAssessment;
};

/**
 *
 * @param {string} id
 * @returns {Promise<TakeAssessment>}
 */
const getAssessment = async (id) => {
  let takeAssessment = await TakeAssessment.findById(id)
    .populate('user')
    .populate({
      path: 'assessment',
      populate: {
        path: 'questions',
      },
    })
    .populate('answers');
  takeAssessment = takeAssessment.toJSON();
  return takeAssessment;
};

/**
 *
 * @param {Answer} body
 * @returns {Promise<TakeAssessment>}
 */
const submitAnswer = async (takeAssessmentId, answerBody, userId) => {
  let takeAssessment = await TakeAssessment.findById(takeAssessmentId).populate('assessment');

  if (!takeAssessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  if (takeAssessment.user.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  if (Date.now() > takeAssessment.endingAt) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Assessment is expired');
  }

  if (!takeAssessment.assessment.questions.some((question) => question.toString() === answerBody.question)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question not found in the assessment');
  }

  const newAnswer = await Answer.create(answerBody);
  takeAssessment.answers.push(newAnswer);
  takeAssessment = await takeAssessment.save();

  takeAssessment = await takeAssessment
    .populate('user')
    .populate({
      path: 'assessment',
      populate: {
        path: 'questions',
      },
    })
    .populate('answers')
    .execPopulate();

  return takeAssessment;
};

module.exports = {
  startAssessment,
  getAssessment,
  submitAnswer,
};
