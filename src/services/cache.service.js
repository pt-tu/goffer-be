const redisClient = require('../utils/redis');

const redis = redisClient.get();

/**
 *
 * @param {string} key
 * @param {any} data
 */
const set = async (key, data) => {
  await redis.set(key, JSON.stringify(data));
};

/**
 *
 * @param {string} key
 * @returns {any}
 */
const get = async (key) => {
  return JSON.parse(await redis.get(key));
};

/**
 *
 * @param {string} key
 */
const del = async (key) => {
  await redis.del(key);
};

module.exports = {
  get,
  set,
  del,
};
