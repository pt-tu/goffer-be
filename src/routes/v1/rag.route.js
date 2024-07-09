// routes/pdfRoutes.js

const express = require('express');

const router = express.Router();
const { ragValidation } = require('../../validations');
const { ragController } = require('../../controllers');
const validate = require('../../middlewares/validate');

router.post('/process-pdf', validate(ragValidation.processPDFSchema), ragController.processPDF);
router.post('/process-markdown', validate(ragValidation.processMarkdownSchema), ragController.processMarkdown);
router.post('/conduct-query', validate(ragValidation.chatSchema), ragController.conductQuery);
router.post('/chat', validate(ragValidation.chatSchema), ragController.chatQuery);
router.post('/parse-pdf', validate(ragValidation.parsePDF), ragController.parsePDF);

module.exports = router;
