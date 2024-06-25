const { BedrockRuntimeClient } = require('@aws-sdk/client-bedrock-runtime');
const config = require('./config');

const client = new BedrockRuntimeClient({
  region: 'us-east-1',
  credentials: {
    secretAccessKey: config.aws.credentials.secretAccessKey,
    accessKeyId: config.aws.credentials.accessKeyId,
  },
});

const model = 'anthropic.claude-3-5-sonnet-20240620-v1:0';

module.exports = {
  client,
  model,
};
