const OpenAI = require('openai');
const config = require('./config');

const openai = new OpenAI({
  apiKey: config.openai.secretKey,
});

module.exports = { openai };
