const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { applyService, jobService, userService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createApplication = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const application = await applyService.createApplication(body);
  res.status(httpStatus.CREATED).send(application);
});

const getApplications = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'job',
    'owner',
    'phase',
    'resume',
    'email',
    'name',
    'lastCompany',
    'linkedIn',
    'location',
    'personalWebsite',
    'phoneNumber',
    'role',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await applyService.getApplications(filter, options);
  res.send(result);
});

const getApplication = catchAsync(async (req, res) => {
  const application = await applyService.getApplication(req.params.id);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  res.send(application);
});

const queryApplication = catchAsync(async (req, res) => {
  const application = await applyService.queryApplication(req.params.id, req.user.id);
  const result = application ? application.toJSON() : {};

  const job = await jobService.getJob(req.params.id);
  const applicant = await userService.getUserById(req.user.id);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  result.job = job;
  result.owner = undefined;
  result.applicant = applicant;

  res.send(result);
});

const updateApplication = catchAsync(async (req, res) => {
  const updatedApplication = await applyService.updateApplication(req);
  res.send(updatedApplication);
});

const countApplicationsByPhases = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['job']);

  const result = await applyService.countApplicationsByPhases(filter);
  res.send(result);
});

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  queryApplication,
  updateApplication,
  countApplicationsByPhases,
};
