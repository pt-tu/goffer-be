const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(jobValidation.createJob), jobController.createJob)
  .get(auth(), validate(jobValidation.getJobs), jobController.getJobs);

router.route('/individual').get(validate(jobValidation.getJobs), jobController.getJobs);

router.route('/:id').get(auth(), validate(jobValidation.getJob), jobController.getJob);

module.exports = router;
