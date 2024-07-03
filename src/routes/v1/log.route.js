const express = require('express');
const { logController } = require('../../controllers');

const router = express.Router();

router.post('/', logController.writeLog);
router.get('/', logController.getLogs);

module.exports = router;
