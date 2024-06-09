const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService, interactionService } = require('../services');
const ApiError = require('../utils/ApiError');

const toggleInteraction = catchAsync(async (req, res) => {
  const [job, saved] = await Promise.all([
    jobService.getJob(req.params.id),
    interactionService.toggleInteraction(req.params.type, req.params.id, req.user?._id),
  ]);

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  job.saved = saved;
  res.send(job);
});

module.exports = {
  toggleInteraction,
};
