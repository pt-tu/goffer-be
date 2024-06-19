// plugins/duplicateKeyErrorPlugin.js
const duplicateKeyErrorPlugin = (msgFn) => (schema) => {
  schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      const message = msgFn(field, value);
      return next(new Error(message));
    }
    next(error);
  });

  schema.post('update', function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      const message = msgFn(field, value);
      return next(new Error(message));
    }
    next(error);
  });

  schema.post('findOneAndUpdate', function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      const message = msgFn(field, value);
      return next(new Error(message));
    }
    next(error);
  });

  schema.post('insertMany', function (error, docs, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      const message = msgFn(field, value);
      return next(new Error(message));
    }
    next(error);
  });
};

module.exports = duplicateKeyErrorPlugin;
