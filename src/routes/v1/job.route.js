const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(jobValidation.createJob), jobController.createJob)
  .get(validate(jobValidation.getJobs), jobController.getJobs);

router.route('/individual').get(validate(jobValidation.getJobs), jobController.getJobs);

router.route('/:id').get(validate(jobValidation.getJob), jobController.getJob);
router.route('/:id/sourcing').get(auth(), jobController.getSourcing);

module.exports = router;
