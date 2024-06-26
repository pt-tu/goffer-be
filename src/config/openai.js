const OpenAI = require('openai');
const { ChatOpenAI } = require('@langchain/openai');
const config = require('./config');

const openai = new OpenAI({
  apiKey: config.openai.secretKey,
});

const langchainOpenai = new ChatOpenAI({
  apiKey: config.openai.secretKey,
  model: 'gpt-4o',
  maxTokens: 4096,
});

module.exports = { openai, langchainOpenai };
