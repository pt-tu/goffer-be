const httpStatus = require('http-status');
const { openai } = require('../config/openai');
const ApiError = require('../utils/ApiError');

const generateResponse = async (prompt, systemMessage, maxTokens) => {
  try {
    const messages = [
      { role: 'system', content: systemMessage || 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o',
      max_tokens: maxTokens || 1000,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'Error generating response');
  }
};

module.exports = { generateResponse };
