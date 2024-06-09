const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService, interactionService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createJob = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const job = await jobService.createJob(body);
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
    'org',
    'status',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.user = req.user?._id;
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const [job, saved] = await Promise.all([
    jobService.getJob(req.params.id),
    interactionService.checkInteraction('Job', req.params.id, req.user?._id),
  ]);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  job.saved = saved;
  res.send(job);
});

const getSourcing = catchAsync(async (req, res) => {
  const sourcing = await jobService.getSourcing(req.params.id);
  res.send(sourcing);
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  getSourcing,
};
