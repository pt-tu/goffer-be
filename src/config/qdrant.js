const { QdrantVectorStore } = require('@langchain/qdrant');
const { QdrantClient } = require('@qdrant/js-client-rest');
const { PromptTemplate } = require('@langchain/core/prompts');
const { RunnableSequence, RunnablePassthrough } = require('@langchain/core/runnables');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { ChatOpenAI } = require('@langchain/openai');
const { formatDocumentsAsString } = require('langchain/util/document');
const config = require('./config');
const embeddings = require('./embedding');
// const { bedrockLangchainModel } = require('./bedrock');
const logger = require('./logger');
const genai = require('./genai');
// const { bedrockLangchainModel } = require('./bedrock');

const model = new ChatOpenAI({
  apiKey: config.openai.secretKey,
  model: 'gpt-4o',
  maxTokens: 4096,
});

const client = new QdrantClient({
  url: config.qdrant.url,
  apiKey: config.qdrant.apiKey,
});

let vectorStore = null;
let retriever = null;
let conversationalRetrievalQAChain = null;

(async () => {
  if (conversationalRetrievalQAChain) return;
  vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: config.qdrant.url,
    collectionName: config.qdrant.collectionName,
    apiKey: config.qdrant.apiKey,
  });
  retriever = vectorStore.asRetriever();

  const condenseQuestionTemplate = `${genai.RAG_SYSTEM_PROMPT}. Here are also the history of your conversation with user. Use this for reference if needed. REPLY IN PLAIN TEXT. DON'T USE MARKDOWN.

  Chat History:
  {chat_history}
  Follow Up Input: {question}
  Standalone question:`;
  const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(condenseQuestionTemplate);

  const answerTemplate = `Context:
  {context}

  Question: {question}
  REPLY IN PLAIN TEXT. DON'T USE MARKDOWN.
  `;
  const ANSWER_PROMPT = PromptTemplate.fromTemplate(answerTemplate);

  const formatChatHistory = (chatHistory) => {
    const formattedDialogueTurns = chatHistory.map(
      (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
    );
    return formattedDialogueTurns.join('\n');
  };

  const standaloneQuestionChain = RunnableSequence.from([
    {
      question: (input) => input.question,
      chat_history: (input) => formatChatHistory(input.chat_history),
    },
    CONDENSE_QUESTION_PROMPT,
    model,
    new StringOutputParser(),
  ]);

  const answerChain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    ANSWER_PROMPT,
    model,
  ]);

  conversationalRetrievalQAChain = standaloneQuestionChain.pipe(answerChain);
  logger.info('Conversational retrieval QA chain is ready');
})();

const getConversationalRetrievalQAChain = () => conversationalRetrievalQAChain;

module.exports = { client, vectorStore, retriever, conversationalRetrievalQAChain, getConversationalRetrievalQAChain };
