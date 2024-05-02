const Question = require('../models/question.model');

/**
 *
 * @param {Array<Question>} questionsBody
 * @returns {Promise<Array<Question>>}
 */
const createQuestions = async (questionsBody) => {
  const question = await Question.insertMany(questionsBody);
  return question;
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestions = async (filter, options) => {
  const questions = await Question.paginate(filter, options);
  return questions;
};

module.exports = {
  createQuestions,
  queryQuestions,
};
