const { AssemblyAI } = require('assemblyai');
const config = require('./config');

const client = new AssemblyAI({
  apiKey: config.assemblyai.apiKey,
});

module.exports = client;
