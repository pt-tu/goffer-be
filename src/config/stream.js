const { StreamChat } = require('stream-chat');
const config = require('./config');

let instance = null;

/**
 *
 * @returns {StreamChat>}
 */
const getStreamClient = () => {
  instance = StreamChat.getInstance(config.stream.publicKey, config.stream.secretKey);
  return instance;
};

module.exports = getStreamClient;
