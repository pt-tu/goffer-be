const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const cloudinary = require('../config/cloudinary');
const logger = require('../config/logger');

/**
 *
 * @param {Express.Multer.File} file
 * @param {string | undefined} type
 * @returns
 */
const upload = async (file, type) => {
  try {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'goffer',
      ...(type === 'avatar' && {
        transformation: {
          width: 500,
          height: 500,
          crop: 'fill',
        },
      }),
    });
    return response;
  } catch (error) {
    logger.debug(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid file');
  }
};

module.exports = {
  upload,
};
