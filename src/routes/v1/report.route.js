const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { reportValidation } = require('../../validations');
const { reportController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(reportValidation.createReport), reportController.createReport)
  .get(auth(), reportController.listReports);

router.route('/:id').patch(auth(), reportController.updateReport);

module.exports = router;
