const httpStatus = require('http-status');
const { encodeBase64 } = require('stream-chat');
const _ = require('lodash');
const { Assessment, Answer } = require('../models');
const ApiError = require('../utils/ApiError');
const { submitBatchService, getBatchSubmissionsService } = require('./grading.service');
const logger = require('../config/logger');

/**
 * Create an assessment
 * @param {Object} assessmentBody
 * @returns {Promise<Assessment>}
 */
const createAssessment = async (assessmentBody) => {
  return Assessment.create(assessmentBody);
};

/**
 * Query for assessments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAssessments = async (filter, options) => {
  const finalFilter = { ...filter, ...(filter.search && { title: { $regex: filter.search, $options: 'i' } }) };
  delete finalFilter.search;
  const assessments = await Assessment.paginate(finalFilter, options);
  return assessments;
};

/**
 * Get assessment by id
 * @param {ObjectId} id
 * @returns {Promise<Assessment>}
 */
const getAssessmentById = async (id) => {
  return Assessment.findById(id).populate('questions').populate('job').populate('org');
};

/**
 * Update assessment by id
 * @param {ObjectId} assessmentId
 * @param {Object} updateBody
 * @returns {Promise<Assessment>}
 */
const updateAssessmentById = async (assessmentId, updateBody) => {
  const assessment = await getAssessmentById(assessmentId);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  Object.assign(assessment, updateBody);
  await assessment.save();
  return assessment;
};

/**
 * Delete assessment by id
 * @param {ObjectId} assessmentId
 * @returns {Promise<Assessment>}
 */
const deleteAssessmentById = async (assessmentId) => {
  const assessment = await getAssessmentById(assessmentId);
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  await assessment.remove();
  return assessment;
};

const getPublicAssessmentById = async (id) => {
  const assessment = await getAssessmentById(id);
  const selectedAssessments = assessment?.job?.assessments;
  if (!selectedAssessments || !selectedAssessments.includes(assessment._id)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  return assessment;
};

const compareMCQ = (question, answer) => {
  const correctChoice = question.choices.find((c) => c.isCorrect === true).content;
  return answer.content === correctChoice;
};

const calculateCodingPoints = async (question, answer) => {
  try {
    const inLines = question.gradingInput?.split('\n') || [];
    const outLines = question.gradingOutput?.split('\n') || [];
    const stdins = _.chunk(inLines, question.numberOfTestCaseLines).map((arr) => arr.join('\n'));
    // eslint-disable-next-line camelcase
    const expected_outputs = _.chunk(outLines, question.numberOfOutputLines).map((arr) => arr.join('\n'));

    const body = {};
    body.language_id = answer.lang;
    body.source_code = encodeBase64(answer.content || '');

    const submissions = stdins.map((item, index) => ({
      ...body,
      stdin: encodeBase64(item),
      expected_output: encodeBase64(expected_outputs[index]),
    }));

    const response = await submitBatchService(submissions);
    const tokens = response.map((item) => item.token);
    const results = await new Promise((resolve, reject) => {
      let timeout = null;
      timeout = setTimeout(async () => {
        try {
          const res = await getBatchSubmissionsService(tokens);
          if (!('submissions' in res)) {
            return;
          }
          // eslint-disable-next-line no-restricted-syntax
          for (const submission of res.submissions) {
            if (!('stdout' in submission)) {
              return;
            }
          }
          resolve(res.submissions);
          if (timeout) {
            clearTimeout(timeout);
          }
        } catch (error) {
          reject(error);
          if (timeout) {
            clearTimeout(timeout);
          }
        }
      }, 5000);
    });

    // console.log('judge0 results:', results);

    let correctCount = 0;
    results.forEach((item) => {
      if (item.status?.id === 3) {
        correctCount += 1;
      }
    });
    const points = correctCount / results.length;

    // console.log('correctcount:', correctCount);
    // console.log('points:', points);

    return {
      points,
      answerId: answer._id || answer.id,
    };
  } catch (error) {
    logger.error(error);
    return {
      points: 0,
      answerId: answer._id || answer.id,
    };
  }
};

const calculateScores = async (assessmentId, answers) => {
  const assessment = await Assessment.findById(assessmentId).populate({
    path: 'questions',
  });
  if (!assessment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Assessment not found');
  }
  const { questions } = assessment;

  let correctCount = 0;
  const totalQuestions = questions.length;

  const promises = [];

  for (let i = 0; i < answers.length; i += 1) {
    const curr = answers[i];
    const correspondingQuestion = questions.find((q) => q._id.toString() === curr.question.toString());
    // console.log('curr', curr);
    if (correspondingQuestion.type === 'mcq' && compareMCQ(correspondingQuestion, curr)) {
      correctCount += 1;
      // eslint-disable-next-line no-await-in-loop
    } else if (correspondingQuestion.type === 'coding') {
      // console.log('add code promise');
      promises.push(calculateCodingPoints(correspondingQuestion, curr));
    }
  }

  const results = await Promise.all(promises);

  // console.log('before', correctCount);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const result of results) {
    // console.log('xxxzzz', result);
    correctCount += result.points;
    Answer.findByIdAndUpdate(result.answerId, { points: result.points });
  }

  return (correctCount / (totalQuestions || 1)) * 100;
};

module.exports = {
  createAssessment,
  queryAssessments,
  getAssessmentById,
  updateAssessmentById,
  deleteAssessmentById,
  getPublicAssessmentById,
  calculateScores,
};
