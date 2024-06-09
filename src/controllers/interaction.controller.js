const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService, organizationService, interactionService, userService } = require('../services');
const ApiError = require('../utils/ApiError');

const toggleInteraction = catchAsync(async (req, res) => {
  let entityPromise;
  switch (req.params.type) {
    case 'Job':
      entityPromise = jobService.getJob(req.params.id);
      break;
    case 'Organization':
      entityPromise = organizationService.getOrganizationById(req.params.id);
      break;
    case 'User':
      entityPromise = userService.getUserById(req.params.id);
      break;
    default:
      entityPromise = undefined;
      break;
  }

  if (!entityPromise) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Entity not allowed');
  }

  const [entity, saved] = await Promise.all([
    entityPromise,
    interactionService.toggleInteraction(req.params.type, req.params.id, req.user?._id),
  ]);

  if (!entity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Id not found');
  }

  entity.saved = saved;
  res.send(entity);
});

module.exports = {
  toggleInteraction,
};
