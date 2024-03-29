const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createCheckoutSession = catchAsync(async (req, res) => {
  const session = await paymentService.createCheckoutSession(req.body);
  res.status(httpStatus.CREATED).send({ id: session.id });
});

module.exports = {
  createCheckoutSession,
};
