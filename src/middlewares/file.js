const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single('file');

module.exports = {
  uploadMiddleware,
};
