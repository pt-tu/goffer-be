const { QdrantVectorStore } = require('@langchain/qdrant');
const { QdrantClient } = require('@qdrant/js-client-rest');

const config = require('./config');
const embeddings = require('./embedding');
// const { bedrockLangchainModel } = require('./bedrock');
const logger = require('./logger');
// const genai = require('./genai');
// const { bedrockLangchainModel } = require('./bedrock');

const client = new QdrantClient({
  url: config.qdrant.url,
  apiKey: config.qdrant.apiKey,
});

let vectorStore = null;
let retriever = null;

(async () => {
  if (retriever) return;
  vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: config.qdrant.url,
    collectionName: config.qdrant.collectionName,
    apiKey: config.qdrant.apiKey,
  });
  retriever = vectorStore.asRetriever();

  logger.info('Conversational retrieval QA chain is ready');
})();

const getRetriever = () => {};

module.exports = { client, vectorStore, retriever, getRetriever };
