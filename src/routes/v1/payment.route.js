const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentValidation = require('../../validations/payment.validation');
const paymentController = require('../../controllers/payment.controller');

const router = express.Router();

router.post(
  '/create-checkout-session',
  auth(),
  validate(paymentValidation.createCheckoutSession),
  paymentController.createCheckoutSession
);

module.exports = router;
