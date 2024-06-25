// const { BedrockEmbeddings } = require('@langchain/community/embeddings/bedrock');
const { OpenAIEmbeddings } = require('@langchain/openai');
const config = require('./config');

// const embeddings = new BedrockEmbeddings({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: config.aws.credentials.accessKeyId,
//     secretAccessKey: config.aws.credentials.secretAccessKey,
//   },
//   model: 'amazon.titan-embed-text-v1', // Default value
// });

const embeddings = new OpenAIEmbeddings({
  apiKey: config.openai.secretKey,
  batchSize: 2024, // Default value if omitted is 512. Max is 2048
  model: 'text-embedding-3-large',
});

module.exports = embeddings;
