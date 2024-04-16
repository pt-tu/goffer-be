const Question = require('../models/question.model');

/**
 *
 * @param {Question} questionBody
 * @returns {Promise<Question>}
 */
const createQuestion = async (questionBody) => {
  const question = await Question.create(questionBody);
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
  createQuestion,
  queryQuestions,
};
