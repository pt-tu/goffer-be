const { analyticsService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getConversionRateData = catchAsync(async (req, res) => {
  const { job, startDate, endDate, granularity } = req.query;
  const data = await analyticsService.getConversionRateData(job, startDate, endDate, granularity);
  res.json(data);
});

const getSubmitTimeData = catchAsync(async (req, res) => {
  const { job } = req.query;
  const data = await analyticsService.getSubmitTimeData(job);
  res.json(data);
});

module.exports = {
  getConversionRateData,
  getSubmitTimeData,
};
