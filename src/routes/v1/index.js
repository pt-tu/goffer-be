const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const fileRoute = require('./file.route');
const jobRoute = require('./job.route');
const organizationRoute = require('./organization.route');
const paymentRoute = require('./payment.route');
const questionRoute = require('./question.route');
const applyRoute = require('./apply.route');
const answerRoute = require('./answer.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/files',
    route: fileRoute,
  },
  {
    path: '/organizations',
    route: organizationRoute,
  },
  {
    path: '/payments',
    route: paymentRoute,
  },
  {
    path: '/jobs',
    route: jobRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
  {
    path: '/apply',
    route: applyRoute,
  },
  {
    path: '/answers',
    route: answerRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
