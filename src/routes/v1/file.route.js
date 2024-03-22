const express = require('express');
const fileController = require('../../controllers/file.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/upload', auth(), fileController.upload);

module.exports = router;
