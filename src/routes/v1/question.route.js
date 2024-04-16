const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(questionValidation.createQuestion), questionController.createQuestion)
  .get(auth(), validate(questionValidation.getQuestions), questionController.getQuestions);

// router.route('/individual').get(validate(jobValidation.getJobs), questionController.getJobs);

module.exports = router;
