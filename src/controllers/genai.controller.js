const genaiService = require('../services/genai.service');
const catchAsync = require('../utils/catchAsync');

// const getResponse = async (req, res) => {
//   const { prompt, systemMessage } = req.body;
//   try {
//     const response = await genaiService.generateResponse(prompt, systemMessage);
//     res.json({ response });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getResponse = catchAsync(async (req, res) => {
  const { prompt, systemMessage, maxTokens } = req.body;
  const response = await genaiService.generateResponse(prompt, systemMessage, maxTokens);
  res.json({ response });
});

module.exports = { getResponse };
