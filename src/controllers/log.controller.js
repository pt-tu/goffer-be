const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { logService } = require('../services');

const writeLog = catchAsync(async (req, res) => {
  const log = await logService.writeLog(req.body);
  res.status(httpStatus.CREATED).send(log);
});

const getLogs = catchAsync(async (req, res) => {
  const logs = await logService.getLogs(req.query);
  res.send(logs);
});

module.exports = {
  writeLog,
  getLogs,
};
