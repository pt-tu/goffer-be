const express = require('express');
const { analyticsController } = require('../../controllers');
const { analyticsValidation } = require('../../validations');
const validate = require('../../middlewares/validate');

const router = express.Router();

router
  .route('/conversion-rate')
  .get(validate(analyticsValidation.getConversionRateData), analyticsController.getConversionRateData);
router.route('/submit-time').get(validate(analyticsValidation.getSubmitTimeData), analyticsController.getSubmitTimeData);

module.exports = router;
