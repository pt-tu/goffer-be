const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobValidation = require('../../validations/job.validation');
const jobController = require('../../controllers/job.controller');

const router = express.Router();

router.route('/').post(auth(), validate(jobValidation.createJob), jobController.createJob);
// .get(auth(), validate(jobValidation.getjobs), jobController.getjobs);

// router
//   .route('/:id')
//   .get(auth(), validate(jobValidation.getJob), jobController.getJob)
//   .patch(auth(), validate(jobValidation.updateJob), jobController.updateJob)
//   .delete(auth(), validate(jobValidation.deleteJob), jobController.deleteJob);

module.exports = router;
