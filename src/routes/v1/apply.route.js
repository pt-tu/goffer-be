const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const applyValidation = require('../../validations/apply.validation');
const applyController = require('../../controllers/apply.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(applyValidation.createApplication), applyController.createApplication)
  .get(auth(true), validate(applyValidation.getApplications), applyController.getApplications)
  .patch(auth(), validate(applyValidation.updateApplication), applyController.updateApplication);

router.route('/:id').get(auth(), validate(applyValidation.getApplication), applyController.getApplication);

router.route('/job/:id').get(auth(), validate(applyValidation.getApplication), applyController.queryApplication);

module.exports = router;
