const express = require('express');
const auth = require('../../middlewares/auth');
const catchAsync = require('../../utils/catchAsync');
const { speechService } = require('../../services');

const router = express.Router();

router.route('/').post(
  auth(),
  catchAsync(async (req, res) => {
    const result = await speechService.speechToText(req.body.audioUrl);
    res.send(result.text);
  })
);

module.exports = router;
