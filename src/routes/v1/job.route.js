const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');
const interactionType = require('../../middlewares/interactionType');
const interactionValidation = require('../../validations/interaction.validation');
const interactionController = require('../../controllers/interaction.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(jobValidation.createJob), jobController.createJob)
  .get(auth(), validate(jobValidation.getJobs), jobController.getJobs);

router.route('/individual').get(validate(jobValidation.getJobs), jobController.getJobs);

router.route('/:id').get(auth(true), validate(jobValidation.getJob), jobController.getJob);
router.route('/:id/sourcing').get(auth(), jobController.getSourcing);
router
  .route('/:id/toggle')
  .post(
    auth(),
    validate(interactionValidation.toggleInteraction),
    interactionType('Job'),
    interactionController.toggleInteraction
  );

module.exports = router;
