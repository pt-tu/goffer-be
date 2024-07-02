const { Log } = require('../models');

const writeLog = (data) => {
  return Log.create(data);
};

const getLogs = (query) => {
  return Log.find(query).populate('user');
};

module.exports = {
  writeLog,
  getLogs,
};
