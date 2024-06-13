const { openai } = require('../config/openai');

const generateResponse = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4o',
    });
    return response.choices[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateResponse };
