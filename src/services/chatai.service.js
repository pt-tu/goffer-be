const { model } = require('../config/google');

/**
 *
 * @param {string} prompt
 * @returns {Promise<string>}
 */
const complete = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

module.exports = { complete };
