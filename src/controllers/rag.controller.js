// controllers/pdfController.js

const config = require('../config/config');
const { ragService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const processPDF = catchAsync(async (req, res) => {
  const { filePath } = req.body;
  const customMeta = {
    file_id: 'unique-file-id',
    display_file_name: 'display_file_name',
    display_folder_name: 'display_folder_name',
  };

  const pdfText = await ragService.loadPDF(filePath);
  await ragService.persistEmbeddings(config.qdrant.collectionName, pdfText, customMeta);
  // const answer = await ragService.conductQuery('What is this about?', config.qdrant.collectionName);
  res.status(200).send();
});

const processMarkdown = catchAsync(async (req, res) => {
  const { filePath } = req.body;
  const customMeta = {
    file_id: 'unique-file-id',
    display_file_name: 'display_file_name',
    display_folder_name: 'display_folder_name',
  };

  const markdownContent = await ragService.loadMarkdown(filePath);
  await ragService.persistEmbeddings(config.qdrant.collectionName, markdownContent, customMeta);
  const answer = await ragService.conductQuery('What is this about?', config.qdrant.collectionName);
  res.status(200).json({ answer });
});

const conductQuery = catchAsync(async (req, res) => {
  const { query } = req.query;

  const answer = await ragService.conductQuery(query, config.qdrant.collectionName);
  res.status(200).json({ answer });
});

const chatQuery = catchAsync(async (req, res) => {
  const { messages } = req.body;

  const answer = await ragService.chat(messages);
  res.status(200).json(answer);
});

module.exports = {
  processPDF,
  processMarkdown,
  conductQuery,
  chatQuery,
};
