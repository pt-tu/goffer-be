const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { applyService, jobService, userService, genaiService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const flattenPlatejsData = require('../utils/flattenPlatejsData');
const genai = require('../config/genai');
const { checkPdf } = require('../utils/pdf');
const logger = require('../config/logger');

const createApplication = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;

  if (!checkPdf(body.resume)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Resume must be a pdf file');
  }

  const application = await applyService.createApplication(body);
  (async () => {
    try {
      const job = await jobService.getJob(body.job);
      let { description } = job;
      try {
        description = flattenPlatejsData(description);
      } catch (error) {
        // Do nothing
      }
      const jd = await genaiService.bedrockGenerateResponse(description, genai.KEYWORD_EXTRACT_PROMPT, 100);
      const { score, reason } = await applyService.resumeScore(body.resume, jd);
      await applyService.updateApplicationRaw(application._id, {
        match: score,
        reason,
      });
    } catch (error) {
      logger.error('Error in resume scoring', error);
    }
  })();
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
  const advanced = pick(req.query, ['q', 'match', 'rating', 'assessmentAvg']);

  const result = await applyService.getApplications(filter, options, advanced);

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
  const { params, user, body } = req;
  const updatedApplication = await applyService.updateApplication(params.id, user.id, body);
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
