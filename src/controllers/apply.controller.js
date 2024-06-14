const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { applyService } = require('../services');
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
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  res.send(application);
});

const updateApplication = catchAsync(async (req, res) => {
  const application = await applyService.getApplication(req.body.id);
  if (req.user.id !== application.owner.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const updatedApplication = await applyService.updateApplication(req.body.id, req.body);
  res.send(updatedApplication);
});

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  queryApplication,
  updateApplication,
};
