const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { recombeeController } = require('../../controllers');
const { recombeeValidation } = require('../../validations');

const router = express.Router();

router.get('/users', auth(), validate(recombeeValidation.getRecommendations), recombeeController.getUsersRecommendations);
router.get('/jobs', auth(), validate(recombeeValidation.getRecommendations), recombeeController.getJobRecommendations);
router.get(
  '/organizations',
  auth(),
  validate(recombeeValidation.getRecommendations),
  recombeeController.getOrganizationRecommendations
);
router.get(
  '/candidates/:jobId',
  auth(),
  validate(recombeeValidation.getRecommendations),
  recombeeController.getCandidateRecommendations
);
router.post('/interact/:itemId', auth(), validate(recombeeValidation.interactWithItem), recombeeController.interactWithItem);

module.exports = router;
