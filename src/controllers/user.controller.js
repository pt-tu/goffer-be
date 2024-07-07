const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, interactionService, paymentService, recombeeService, tokenService } = require('../services');
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
  await recombeeService.addUserToRecombee(user);
  const tokens = await tokenService.generateAuthTokens(user);
  res.cookie('token', tokens.refresh.token, {
    expires: tokens.refresh.expires,
    ...config.jwt.cookieRefreshOptions,
  });
  delete tokens.refresh;
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'portfolioDomain', 'isBanned']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.user = req.user?._id;
  const result = await userService.queryUsers(filter, options);
  const users = await new ProUserListDecorator(result.results).getUsers();
  result.results = users;
  res.send(result);
});

const recommendUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'portfolioDomain']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'recommId']);
  const advanced = pick(req.query, ['searchQuery', 'tools', 'skills']);

  if (advanced.tools) {
    advanced.tools = advanced.tools.split(',');
  }

  if (advanced.skills) {
    advanced.skills = advanced.skills.split(',');
  }

  options.user = req.user?._id;

  const recomUserIds = await recombeeService.recommendUsers(req.user?.id, 100);
  filter._id = { $in: recomUserIds };
  const result = await userService.queryUsers(filter, options, advanced);

  const userMap = new Map(result.results.map((user) => [user.id, user]));
  const sortedUsers = recomUserIds.map((id) => userMap.get(id)).filter((user) => user !== undefined);

  const users = await new ProUserListDecorator(sortedUsers).getUsers();
  result.results = users;

  if (result.results.length === 0) {
    result.endOfResults = true;
  }

  res.send(result);
});

const recommendCandidates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'portfolioDomain']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.user = req.user?._id;

  const advanced = pick(req.query, ['searchQuery', 'tools', 'skills', 'experience']);

  const recomUserIds = await recombeeService.recommendCandidates(req.params?.jobId, 100, options.page || 1);
  filter._id = { $in: recomUserIds };
  const result = await userService.queryUsers(filter, options, advanced);

  const userMap = new Map(result.results.map((user) => [user.id, user]));
  const sortedUsers = recomUserIds.map((id) => userMap.get(id)).filter((user) => user !== undefined);
  const users = await new ProUserListDecorator(sortedUsers).getUsers();

  result.results = users;

  if (result.results.length === 0) {
    result.endOfResults = true;
  }
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

  if (req.body.resume) {
    await userService.updateUserById(req.user.id, { enhance: null });
    (async () => {
      const enhance = await userService.reviewResume(req.body.resume);
      await userService.updateUserById(req.user.id, { enhance });
    })();
  }

  const user = await userService.updateUserById(req.user.id, req.body);
  await recombeeService.updateUserInRecombee(user);
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  await recombeeService.updateUserInRecombee(user);
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

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { reason } = req.body;
  const user = await userService.updateUserById(userId, {
    isBanned: true,
    reason,
    blockedAt: new Date(),
  });
  res.send(user);
});

const unblockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.updateUserById(userId, {
    isBanned: false,
    reason: null,
    blockedAt: null,
  });
  res.send(user);
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
  recommendUsers,
  recommendCandidates,
  blockUser,
  unblockUser,
};
