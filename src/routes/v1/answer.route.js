const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const answerValidation = require('../../validations/answer.validation');
const answerController = require('../../controllers/answer.controller');

const router = express.Router();

router.route('/').get(auth(), validate(answerValidation.getAnswers), answerController.getAnswers);

router.route('/audio').post(auth(), validate(answerValidation.submitAudioAnswer), answerController.submitAudioAnswer);
router
  .route('/assessment')
  .post(auth(), validate(answerValidation.submitAssessmentAnswer), answerController.submitAssessmentAnswer);

router.route('/summarize/audio').post(auth(), validate(answerValidation.summarizeAudio), answerController.summarizeAudio);
router.route('/:id').get(auth(), validate(answerValidation.getAnswer), answerController.getAnswer);
router
  .route('/apply-question/:applicationId/:questionId')
  .get(auth(), validate(answerValidation.getApplyAnswer), answerController.getApplyAnswer);

module.exports = router;
