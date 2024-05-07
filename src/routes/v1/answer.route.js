const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const answerValidation = require('../../validations/answer.validation');
const answerController = require('../../controllers/answer.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(answerValidation.createAnswer), answerController.createAnswer)
  .get(auth(), validate(answerValidation.getAnswers), answerController.getAnswers);

router.route('/:id').get(auth(), validate(answerValidation.getAnswer), answerController.getAnswer);

module.exports = router;
