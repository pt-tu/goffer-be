const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService, interactionService, applyService, recombeeService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createJob = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const job = await jobService.createJob(body);
  await recombeeService.addJobToRecombee(job);
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
  const [job, saved, applied] = await Promise.all([
    jobService.getJob(req.params.id),
    interactionService.checkInteraction('Job', req.params.id, req.user?._id),
    applyService.queryApplication(req.params.id, req.user?._id),
  ]);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const result = job.toJSON();
  result.publicLink = `http://localhost:5173/job/${job.id}-${encodeURI(job.title.toLowerCase().replace(/\s/g, '-'))}`;
  result.saved = saved;
  result.applied = !!applied;

  if (req.user?._id) {
    await recombeeService.sendInteraction(req.user?._id, req.params.id, 'view');
  }

  res.send(result);
});

const recommendJobs = catchAsync(async (req, res) => {
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
  const recomJobIds = await recombeeService.recommendJobs(
    req.user?._id,
    req.query.searchQuery,
    options.limit || 10,
    options.page || 1
  );
  filter._id = {
    $in: recomJobIds,
  };
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

const getSourcing = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const sourcing = await jobService.getSourcing(req.params.id, filter, options);
  res.send(sourcing);
});

const updateJob = catchAsync(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body);
  await recombeeService.updateJobInRecombee(job);
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  await jobService.deleteJob(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getSourcing,
  recommendJobs,
};
