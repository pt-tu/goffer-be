const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const feedbackValidation = require('../../validations/feedback.validation');
const feedbackController = require('../../controllers/feedback.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(feedbackValidation.createFeedback), feedbackController.createFeedback)
  .get(validate(feedbackValidation.getFeedbacks), feedbackController.getFeedbacks);

router
  .route('/:id')
  .post(auth(), validate(feedbackValidation.updateFeedback), feedbackController.updateFeedback)
  .get(validate(feedbackValidation.getFeedback), feedbackController.getFeedback);

module.exports = router;
