const Feedback = require('../models/feedback.model');

/**
 *
 * @param {Feedback} body
 * @returns {Promise<Feedback>}
 */
const createFeedback = async (body) => {
  const feedback = await Feedback.create(body);
  return feedback;
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
const getFeedbacks = async (filter, options) => {
  const feedbacks = await Feedback.paginate(filter, options);
  return feedbacks;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Feedback>}
 */
const getFeedback = async (id) => {
  let feedback = await Feedback.findById(id).populate('owner');
  feedback = feedback.toJSON();
  return feedback;
};

/**
 *
 * @param {string} id
 * @param {Feedback} body
 * @returns {Promise<Feedback>}
 */
const updateFeedback = async (id, body) => {
  const feedback = await Feedback.findByIdAndUpdate(id, body, { new: true }).populate('owner');
  return feedback;
};

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
};
