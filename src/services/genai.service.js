const httpStatus = require('http-status');
const { InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { openai } = require('../config/openai');
const ApiError = require('../utils/ApiError');
const { model, client } = require('../config/bedrock');
const logger = require('../config/logger');

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

const bedrockGenerateResponse = async (prompt, systemMessage, maxTokens) => {
  const command = new InvokeModelCommand({
    modelId: model,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      system: systemMessage,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens || 4096,
      anthropic_version: 'bedrock-2023-05-31',
      temperature: 0.7,
      top_p: 0.9,
      top_k: 40,
      stop_sequences: [],
    }),
  });

  try {
    const response = await client.send(command);
    return JSON.parse(new TextDecoder().decode(response.body))?.content?.at(0)?.text;
  } catch (error) {
    logger.error('Error invoking Bedrock model:', error);
    throw error;
  }
};

module.exports = { generateResponse, bedrockGenerateResponse };
