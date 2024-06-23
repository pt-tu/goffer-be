const logger = require('../config/logger');
const { addUserPropertiesToRecombee, addEntityPropertiesToRecombee } = require('../services/recombee.service');

const setupRecombee = async () => {
  try {
    await Promise.all([addUserPropertiesToRecombee(), addEntityPropertiesToRecombee()]);
  } catch (error) {
    logger.info('Already added properties to Recombee');
  }
};

module.exports = setupRecombee;
