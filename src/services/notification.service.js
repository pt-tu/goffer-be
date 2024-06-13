const getStreamClient = require('../config/stream');

const client = getStreamClient();

const createNotification = async (id, notification) => {
  const channel = client.channel('messaging', id, {
    created_by_id: 'goffer',
  });
  await channel.create();
  channel.sendMessage({
    text: JSON.stringify(notification),
    user_id: 'admin',
  });
};

module.exports = {
  createNotification,
};
