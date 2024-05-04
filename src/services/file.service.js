const DatauriParser = require('datauri/parser');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const cloudinary = require('../config/cloudinary');
const logger = require('../config/logger');

const parser = new DatauriParser();

/**
 *
 * @param {Express.Multer.File} file
 * @param {string | undefined} type
 * @returns
 */
const upload = async (file, type) => {
  try {
    const file64 = parser.format(file.originalname, file.buffer);

    const response = await cloudinary.uploader.upload(file64.content, {
      resource_type: 'auto',
      folder: 'goffer',
      public_id: file.originalname
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
        .concat(`_${Date.now().toString()}`),
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
