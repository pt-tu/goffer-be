const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');
const pick = require('../utils/pick');

const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'title',
    'description',
    'location',
    'salaryFrom',
    'salaryTo',
    'experience',
    'skills',
    'tools',
    'slots',
    'time',
    'workingHours',
    'orgId',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

module.exports = {
  createJob,
  getJobs,
};
