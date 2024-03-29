const Redis = require('ioredis');

let _redis;

const redisClient = {
  /**
   *
   * @returns {Redis.default}
   */
  get() {
    if (!_redis) {
      _redis = new Redis({ host: 'redis' });
      return _redis;
    }
    return _redis;
  },
};

module.exports = redisClient;
