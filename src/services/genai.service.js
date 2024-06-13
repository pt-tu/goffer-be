const { openai } = require('../config/openai');

const generateResponse = async (prompt, systemMessage) => {
  try {
    const messages = [
      { role: 'system', content: systemMessage || 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-4',
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateResponse };
