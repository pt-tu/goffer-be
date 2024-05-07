const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const applyValidation = require('../../validations/apply.validation');
const applyController = require('../../controllers/apply.controller');

const router = express.Router();

router.route('/').post(auth(), validate(applyValidation.createApply), applyController.createApply);

module.exports = router;
