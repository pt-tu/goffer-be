const express = require('express');
const validate = require('../../middlewares/validate');
const evaluationValidation = require('../../validations/evaluation.validation');
const evaluationController = require('../../controllers/evaluation.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(evaluationValidation.createEvaluation), evaluationController.createEvaluation)
  .get(auth(), validate(evaluationValidation.getEvaluations), evaluationController.getEvaluations);

router
  .route('/:evaluationId')
  .get(auth(), validate(evaluationValidation.getEvaluation), evaluationController.getEvaluation)
  .patch(auth(), validate(evaluationValidation.updateEvaluation), evaluationController.updateEvaluation)
  .delete(auth(), validate(evaluationValidation.deleteEvaluation), evaluationController.deleteEvaluation);

module.exports = router;
