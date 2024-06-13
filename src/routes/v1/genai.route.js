const express = require('express');
const genaiController = require('../../controllers/genai.controller');
const validate = require('../../middlewares/validate');
const genaiValidation = require('../../validations/genai.validation');

const router = express.Router();

router.post('/generate', validate(genaiValidation.generateResponse), genaiController.getResponse);

module.exports = router;
