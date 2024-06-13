const genaiService = require('../services/genai.service');

const getResponse = async (req, res) => {
  const { prompt, systemMessage } = req.body;
  try {
    const response = await genaiService.generateResponse(prompt, systemMessage);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getResponse };
