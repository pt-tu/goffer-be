const { StreamChat } = require('stream-chat');

let instance = null;

/**
 *
 * @returns {StreamChat>}
 */
const getStreamClient = () => {
  instance = StreamChat.getInstance('fg7tjncua6rn', 'nfkdg8ssxgq8s9ssuc3g6rfpqcsv45qy7d77kef4wu58gc5hsnyn22svz4m9fn48');
  return instance;
};

module.exports = getStreamClient;
