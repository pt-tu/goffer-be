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

const getTakingAssessmentByAssessmentIdAndUserId = async (assessmentId, userId) => {
  const takeAssessment = await TakeAssessment.findOne({ assessment: assessmentId, user: userId })
    .populate('user')
    .populate('answers');
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

const validateAssessment = async (takeAssessmentId, userId) => {
  const takeAssessment = await TakeAssessment.findById(takeAssessmentId).populate('assessment').populate('answers');

  if (!takeAssessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }

  if (takeAssessment.user.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  if (Date.now() > takeAssessment.endingAt || takeAssessment.status === 'closed') {
    takeAssessment.status = 'closed';
  } else {
    takeAssessment.status = 'pending';
  }
  await takeAssessment.save();

  return takeAssessment;
};

const handleAnswer = async (takeAssessment, answerBody) => {
  if (!takeAssessment.assessment.questions.some((question) => question.toString() === answerBody.question)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question not found in the assessment');
  }

  let existingAnswer = takeAssessment.answers.find((a) => a.question.toString() === answerBody.question);

  if (existingAnswer) {
    existingAnswer = Object.assign(existingAnswer, answerBody);
    existingAnswer = await existingAnswer.save();
  } else {
    const newAnswer = await Answer.create(answerBody);
    takeAssessment.answers.push(newAnswer);
  }

  return takeAssessment.save();
};

/**
 *
 * @param {string} takeAssessmentId
 * @param {Answer} answerBody
 * @param {string} userId
 * @returns {Promise<TakeAssessment>}
 */
const submitAnswer = async (takeAssessmentId, answerBody, userId) => {
  let takeAssessment = await validateAssessment(takeAssessmentId, userId);

  takeAssessment = await handleAnswer(takeAssessment, answerBody);

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
 * @param {string} userId
 * @returns {Promise<TakeAssessment>}
 */
const submitAll = async (takeAssessmentId, userId) => {
  const takeAssessment = await validateAssessment(takeAssessmentId, userId);
  Object.assign(takeAssessment, { status: 'closed' });
  await takeAssessment.save();
  return takeAssessment;
};

const updateTakingAssessment = async (id, updateBody) => {
  const takeAssessment = await TakeAssessment.findById(id);
  if (!takeAssessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Taking assessment not found');
  }
  Object.assign(takeAssessment, updateBody);
  await takeAssessment.save();
  return takeAssessment;
};

const queryTakingAssessment = async (filter) => {
  return TakeAssessment.find(filter).populate('answers');
};

module.exports = {
  startAssessment,
  getAssessment,
  submitAnswer,
  submitAll,
  getTakingAssessmentByAssessmentIdAndUserId,
  updateTakingAssessment,
  queryTakingAssessment,
};
