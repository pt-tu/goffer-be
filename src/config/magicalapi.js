const sdk = require('@api/magicalapi');
const config = require('./config');

sdk.auth(config.magical.apiKey);

module.exports = { sdk };
