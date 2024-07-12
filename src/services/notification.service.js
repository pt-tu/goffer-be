const logger = require('../config/logger');
const getStreamClient = require('../config/stream');

const client = getStreamClient();

const createNotification = async (id, notification) => {
  const channel = client.channel('messaging', id, {
    created_by_id: 'goffer',
  });
  await channel.create();
  try {
    const response = await channel.sendMessage({
      text: JSON.stringify({
        description: notification.description,
        owner: {
          avatar: notification.owner.avatar,
        },
        createdAt: notification.createdAt,
        link: notification.link,
      }),
      user_id: 'admin',
    });
    logger.log('send result', response);
  } catch (error) {
    logger.error('Error sending notification', error);
  }
};

module.exports = {
  createNotification,
};
