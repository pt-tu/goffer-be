const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const assessmentValidation = require('../../validations/assessment.validation');
const assessmentController = require('../../controllers/assessment.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(assessmentValidation.createAssessment), assessmentController.createAssessment)
  .get(validate(assessmentValidation.getAssessments), assessmentController.getAssessments);

router.route('/:id').get(auth(), validate(assessmentValidation.getAssessment), assessmentController.getAssessment);

module.exports = router;
