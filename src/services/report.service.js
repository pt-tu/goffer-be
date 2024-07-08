const { Report } = require('../models');

const createReport = async (report) => {
  return Report.create(report);
};

const listReports = async () => {
  return Report.find().sort({ createdAt: -1 }).populate('owner').populate('resolvedBy');
};

const updateReport = async (id, report) => {
  return Report.findByIdAndUpdate(id, report, { new: true });
};

module.exports = {
  createReport,
  listReports,
  updateReport,
};
