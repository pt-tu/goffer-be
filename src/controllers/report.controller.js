const { reportService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createReport = catchAsync(async (req, res) => {
  const report = await reportService.createReport({
    ...req.body,
    owner: req.user.id,
  });
  res.send(report);
});

const listReports = catchAsync(async (req, res) => {
  const reports = await reportService.listReports();
  res.send(reports);
});

const updateReport = catchAsync(async (req, res) => {
  const report = await reportService.updateReport(req.params.id, req.body);
  res.send(report);
});

module.exports = {
  createReport,
  listReports,
  updateReport,
};
