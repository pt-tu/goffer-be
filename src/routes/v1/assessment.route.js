const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const assessmentValidation = require('../../validations/assessment.validation');
const assessmentController = require('../../controllers/assessment.controller');
const takeAssessmentController = require('../../controllers/takeAssessment.controller');
const takeAssessmentValidation = require('../../validations/takeAssessment.validation');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(assessmentValidation.createAssessment), assessmentController.createAssessment)
  .get(auth(), validate(assessmentValidation.getAssessments), assessmentController.getAssessments);

router
  .route('/taking')
  .get(validate(takeAssessmentValidation.getTakingAssessments), takeAssessmentController.getTakingAssessments);

router
  .route('/:assessmentId')
  .get(auth(), validate(assessmentValidation.getAssessment), assessmentController.getAssessment)
  .patch(auth(), validate(assessmentValidation.updateAssessment), assessmentController.updateAssessment)
  .delete(auth(), validate(assessmentValidation.deleteAssessment), assessmentController.deleteAssessment);

router
  .route('/public/:assessmentId')
  .get(validate(assessmentValidation.getPublicAssessment), assessmentController.getPublicAssessmentById);

router
  .route('/starting')
  .post(auth(), validate(takeAssessmentValidation.startAssessment), takeAssessmentController.startAssessment);

router.route('/taking/current').get(auth(), takeAssessmentController.getTakingAssessmentByAssessmentIdAndUserId);

router
  .route('/taking/submit')
  .post(auth(), validate(takeAssessmentValidation.submitAnswer), takeAssessmentController.submitAnswer);

router
  .route('/taking/finish')
  .post(auth(), validate(takeAssessmentValidation.submitAll), takeAssessmentController.submitAll);

router
  .route('/taking/:id')
  .get(auth(), validate(takeAssessmentValidation.getAssessment), takeAssessmentController.getAssessment);

module.exports = router;
