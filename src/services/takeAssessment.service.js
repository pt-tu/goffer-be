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
 * @param {string} takeAssessmentId
 * @param {Answer} answerBody
 * @param {string} userId
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

/**
 *
 * @param {string} takeAssessmentId
 * @param {List<Answer>} answers
 * @param {string} userId
 * @returns {Promise<TakeAssessment>}
 */
const submitAll = async (takeAssessmentId, answers, userId) => {
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

  const questions = takeAssessment.assessment.questions.map((question) => question.toString());
  const isAllValid = answers.every((answer) => questions.includes(answer.question));

  if (!isAllValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'One or more questions not found in the assessment');
  }

  // tại đấy tôi muốn tạo các answer sau đó cập nhật vào takeAssessment.answers (nếu answer đó đã có thì update, nếu chưa có thì thêm mới)

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
  submitAll,
};
