const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { applyService } = require('../services');

const createApply = catchAsync(async (req, res) => {
  const { user, body } = req;
  req.body.owner = user.id;
  const apply = await applyService.createApply(body);
  res.status(httpStatus.CREATED).send(apply);
});

module.exports = {
  createApply,
};
