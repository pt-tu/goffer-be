const { BedrockRuntimeClient } = require('@aws-sdk/client-bedrock-runtime');
const { Bedrock } = require('@langchain/community/llms/bedrock');

const config = require('./config');

const client = new BedrockRuntimeClient({
  region: 'us-east-1',
  credentials: {
    secretAccessKey: config.aws.credentials.secretAccessKey,
    accessKeyId: config.aws.credentials.accessKeyId,
  },
});

const model = 'anthropic.claude-3-5-sonnet-20240620-v1:0';
const model3 = 'anthropic.claude-3-sonnet-20240229-v1:0';

const bedrockLangchainModel = new Bedrock({
  model3, // You can also do e.g. "anthropic.claude-v2"
  region: 'us-east-1',
  credentials: {
    secretAccessKey: config.aws.credentials.secretAccessKey,
    accessKeyId: config.aws.credentials.accessKeyId,
  },
});

module.exports = {
  client,
  model,
  bedrockLangchainModel,
};
