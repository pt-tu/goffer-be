const { Answer } = require('../models');
const speechService = require('./speech.service');
const chataiService = require('./chatai.service');

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

/**
 *
 * @param {string} audioUrl
 * @returns {Promise<string>}
 */
const summarizeAudio = async (audioUrl) => {
  const transcript = await speechService.speechToText(audioUrl);
  const prompt = `You are receiving an answer from a candidate. Your mission is to summarize the answer within 50 words. The candidate says: "${transcript.text}". Summarize it.`;
  const summary = await chataiService.complete(prompt);
  return summary;
};

/**
 *
 * @param {string} owner
 * @param {string} question
 * @returns {Promise<string>}
 */
const getUserAnswerFromQuestion = async (owner, question) => {
  return Answer.findOne({ owner, question });
};

module.exports = {
  createAnswer,
  queryAnswers,
  getAnswer,
  submitAnswer,
  summarizeAudio,
  getUserAnswerFromQuestion,
};
