const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

const genAI = new GoogleGenerativeAI(config.google.genAI.apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro-latest',
  systemInstruction: 'You are an expert HR manager.',
});

module.exports = {
  model,
};
