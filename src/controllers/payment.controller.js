const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const createCheckoutSession = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const user = await paymentService.getCustomerData(userId);
  const session = await paymentService.createCheckoutSession({
    ...req.body,
    customer: user.customerId,
  });
  res.status(httpStatus.CREATED).send({ id: session.id });
});

module.exports = {
  createCheckoutSession,
};
