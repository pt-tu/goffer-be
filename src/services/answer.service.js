const { Answer } = require('../models');

/**
 *
 * @param {Answer} body
 * @returns {Promise<Answer>}
 */
const createAnswer = async (body) => {
  const answer = await Answer.create(body);
  return answer;
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
const queryAnswers = async (filter, options) => {
  const answers = await Answer.paginate(filter, options);
  return answers;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Answer>}
 */
const getAnswer = async (id) => {
  let answer = await Answer.findById(id).populate('owner').populate('question');
  answer = answer.toJSON();
  return answer;
};

/**
 *
 * @param {Answer} body
 * @returns {Promise<Answer>}
 */
const submitAnswer = async (body) => {
  const answer = await Answer.create(body);
  return answer;
};

module.exports = {
  createAnswer,
  queryAnswers,
  getAnswer,
  submitAnswer,
};
