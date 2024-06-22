const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const recommendationValidation = require('../../validations/recommendation.validation');
const recommendationController = require('../../controllers/recommendation.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(recommendationValidation.createRecommendation), recommendationController.createRecommendation)
  .get(validate(recommendationValidation.getRecommendations), recommendationController.getRecommendations);

router
  .route('/:id')
  .get(validate(recommendationValidation.getRecommendation), recommendationController.getRecommendation)
  .patch(auth(), validate(recommendationValidation.updateRecommendation), recommendationController.updateRecommendation)
  .delete(auth(), validate(recommendationValidation.deleteRecommendation), recommendationController.deleteRecommendation);

module.exports = router;
