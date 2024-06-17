const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, interactionService, paymentService } = require('../services');
const config = require('../config/config');
const { PRICE_ENUM } = require('../config/stripe');
const ProUserDecorator = require('../decorators/ProUserDecorator');
const ProUserListDecorator = require('../decorators/ProUserListDecorator');

const checkEmailExists = catchAsync(async (req, res) => {
  const emailExists = await userService.emailExists(req.query.email);
  res.send({ exists: emailExists });
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'portfolioDomain']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.user = req.user?._id;
  const result = await userService.queryUsers(filter, options);
  const users = await new ProUserListDecorator(result.results).getUsers();
  result.results = users;
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const [user, saved] = await Promise.all([
    userService.getUserById(req.params.userId),
    interactionService.checkInteraction('User', req.params.userId, req.user?._id),
  ]);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = user.toJSON();
  result.saved = saved;
  res.send(result);
});

const getSelf = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await new ProUserDecorator(user).getUser();
  res.send(result);
});

const updateUserSelf = catchAsync(async (req, res) => {
  if (req.body.portfolio) {
    const domain = req.body.portfolio.portfolioDomain;
    delete req.body.portfolio.portfolioDomain;
    req.body.portfolioDomain = domain;
    req.body.portfolio.palette = JSON.stringify(req.body.portfolio.palette);
  }
  const user = await userService.updateUserById(req.user.id, req.body);
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const subscribePro = catchAsync(async (req, res) => {
  const customer = await paymentService.getCustomerData(req.user.id);

  const session = await paymentService.createCheckoutSession(
    {
      mode: 'subscription',
      successUrl: `${config.client.domain}/subscribe?result=success`,
      cancelUrl: `${config.client.domain}/subscribe?result=cancel`,
      customer: customer.customerId,
    },
    PRICE_ENUM.INDIVIDUAL_STAR_PLAN
  );
  res.send(session);
});

module.exports = {
  checkEmailExists,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getSelf,
  updateUserSelf,
  subscribePro,
};
