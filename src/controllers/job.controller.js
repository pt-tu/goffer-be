const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');
const pick = require('../utils/pick');

const createJob = catchAsync(async (req, res) => {
  const jobBody = req.body;
  jobBody.authorId = req.user._id;
  const job = await jobService.createJob(jobBody);
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

const updateJob = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;

  const job = await jobService.updateJob(id, updateBody);
  res.status(httpStatus.OK).send(job);
});

module.exports = {
  createJob,
  getJobs,
  updateJob,
};
