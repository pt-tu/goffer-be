/* eslint-disable security/detect-non-literal-fs-filename */
// services/pdfService.js

const pdfParse = require('pdf-parse');
const fs = require('fs');
const marked = require('marked');
const { RunnableSequence } = require('@langchain/core/runnables');
const { PromptTemplate } = require('@langchain/core/prompts');
const axios = require('axios');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const embeddings = require('../config/embedding');
const { client } = require('../config/qdrant');
const genaiService = require('./genai.service');
const genai = require('../config/genai');
const logger = require('../config/logger');
const config = require('../config/config');
const { langchainOpenai } = require('../config/openai');

async function performSearchQuery(query, collectionTable) {
  try {
    const queryEmbedding = await embeddings.embedQuery(query);
    const response = await client.search(collectionTable, {
      vector: queryEmbedding,
      score_threshold: 0.0,
      limit: 3,
    });

    return response.map((res) => res.payload.content).join('\n');
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

/** CHAT */
//
//
const condenseQuestionTemplate = `${genai.RAG_SYSTEM_PROMPT}. Here the context/documentation: {context}

  Here are also the history of your conversation with user. Use this for reference if needed. REPLY IN PLAIN TEXT. DON'T USE MARKDOWN.
  Chat History:
  {chat_history}

  Follow Up Input: {question}`;
const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(condenseQuestionTemplate);

// const answerTemplate = `Context:
//   {context}

//   Question: {question}
//   You are an HR expert. You need to guide the user on how to use the application. Answer the user's question.
//   `;
// const ANSWER_PROMPT = PromptTemplate.fromTemplate(answerTemplate);

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
    context: async (input) => performSearchQuery(input.question, config.qdrant.collectionName),
  },
  CONDENSE_QUESTION_PROMPT,
  langchainOpenai,
  new StringOutputParser(),
]);

// const answerChain = RunnableSequence.from([
//   async (input) => ({
//     context: await performSearchQuery(input, config.qdrant.collectionName),
//     question: new RunnablePassthrough(),
//   }),
//   ANSWER_PROMPT,
//   langchainOpenai,
// ]);

// const conversationalRetrievalQAChain = standaloneQuestionChain.pipe(answerChain);

const chat = async (messages) => {
  const chatHistory = [];
  messages.forEach((message) => {
    if (message.role === 'user') chatHistory.push([message.content.at(0).text]);
    else if (chatHistory.length > 0) chatHistory[chatHistory.length - 1].push(message.content.at(0).text);
  });

  // console.log('chatHistory', chatHistory);
  const question = messages[messages.length - 1].content.at(0).text;
  const restHistory = chatHistory.slice(0, -1);
  const response = await standaloneQuestionChain.invoke({
    chat_history: restHistory,
    question,
  });

  return response;
};

/** END OF CHAT */
//
//

async function loadPDF(filePathOrUrl) {
  let dataBuffer;
  if (filePathOrUrl.startsWith('http://') || filePathOrUrl.startsWith('https://')) {
    const response = await axios.get(filePathOrUrl, { responseType: 'arraybuffer' });
    dataBuffer = response.data;
  } else {
    dataBuffer = fs.readFileSync(filePathOrUrl);
  }
  const data = await pdfParse(dataBuffer);
  return data.text;
}
async function loadMarkdown(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return marked(data);
}

async function splitDocs(text, chunkSize = 1024, chunkOverlap = 20) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
}

async function persistEmbeddings(collectionTable, documents, customMeta) {
  try {
    await client.createCollection(collectionTable, {
      vectors: {
        size: 3072, // Size of the vector
        distance: 'Cosine', // Distance metric for vector comparison
      },
      // Add other configurations as needed:
      hnsw_config: {
        m: 16, // Max number of edges per node
        ef_construction: 200, // Size of the dynamic list for the nearest neighbors
      },
      // Specify other parameters as defaults or based on your requirements
    });
  } catch (error) {
    logger.info(`Collection ${collectionTable} already exists`);
  }

  const splitDocuments = await splitDocs(documents);
  const em = await embeddings.embedDocuments(splitDocuments);

  const points = splitDocuments.map((doc, idx) => ({
    id: idx,
    vector: em[idx],
    payload: { ...customMeta, content: doc },
  }));

  await client.upsert(collectionTable, {
    wait: true,
    points,
  });

  return 1;
}

async function conductQuery(query, collectionTable) {
  try {
    const queryEmbedding = await embeddings.embedQuery(query);
    const response = await client.search(collectionTable, {
      vector: queryEmbedding,
      score_threshold: 0.0,
      limit: 3,
    });

    const context = response.map((res) => res.payload.content).join('\n');
    const answer = await genaiService.bedrockGenerateResponse(
      query,
      `${genai.RAG_SYSTEM_PROMPT}. Documentation: ${context}`
    );

    return answer;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  loadPDF,
  loadMarkdown,
  persistEmbeddings,
  conductQuery,
  chat,
};
