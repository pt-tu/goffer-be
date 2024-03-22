const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { fileService } = require('../services');
const ApiError = require('../utils/ApiError');
const { uploadMiddleware } = require('../middlewares/file');
const { runMiddleware } = require('../utils/multer');

const upload = catchAsync(async (req, res) => {
  await runMiddleware(req, res, uploadMiddleware);
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please upload a file');
  }
  const file = await fileService.upload(req.file, req.query.type);
  res.send({ file });
});

module.exports = {
  upload,
};
