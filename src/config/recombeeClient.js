const recombee = require('recombee-api-client');
const config = require('./config');

const rqs = recombee.requests;

const client = new recombee.ApiClient(config.recombee.databaseId, config.recombee.privateToken, {
  region: config.recombee.dbRegion,
});

module.exports = { client, rqs };
