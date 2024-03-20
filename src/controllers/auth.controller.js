const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body, req.query);
  const tokens = await tokenService.generateAuthTokens(user);
  res.cookie('token', tokens.refresh.token, {
    expires: tokens.refresh.expires,
    ...config.jwt.cookieRefreshOptions,
  });
  delete tokens.refresh;
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.cookie('token', tokens.refresh.token, {
    expires: tokens.refresh.expires,
    ...config.jwt.cookieRefreshOptions,
  });
  delete tokens.refresh;
  res.send({ user, tokens });
});

const googleLogin = catchAsync(async (req, res) => {
  const user = await authService.loginWithGoogle(req.body.accessToken);
  const tokens = await tokenService.generateAuthTokens(user);
  res.cookie('token', tokens.refresh.token, {
    expires: tokens.refresh.expires,
    ...config.jwt.cookieRefreshOptions,
  });
  delete tokens.refresh;
  res.send({ user, tokens });
});

const authGoogle = catchAsync(async (req, res) => {
  const url = await authService.googleAuthUrl(req, req.query.authType);
  res.redirect(url);
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.cookies.token);
  res.clearCookie('token');
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.cookies.token);
  res.cookie('token', tokens.refresh.token, {
    expires: tokens.refresh.expires,
    ...config.jwt.cookieRefreshOptions,
  });
  delete tokens.refresh;
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  const user = await userService.getUserByEmail(req.body.email);
  if (user.provider === 'google') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are registered with Google. Please login with Google.');
  }
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationTokenEmail = catchAsync(async (req, res) => {
  const verifyOtpTokenEmail = await tokenService.generateOtpToken(req.user);
  await emailService.sendOtpVerificationEmail(req.user.email, verifyOtpTokenEmail);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmailOtp = catchAsync(async (req, res) => {
  await authService.verifyEmailOtp(req.query.token, req.user);
  res.status(httpStatus.OK).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  authGoogle,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  sendVerificationTokenEmail,
  verifyEmailOtp,
  googleLogin,
};
