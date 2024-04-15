/**
 * Rename populated fields by removing 'Id' suffix
 * @param {Array|Object} data - The data to transform, can be an array or a single object.
 * @param {Array} fieldsToPopulate - The fields that have been populated and need renaming.
 * @returns {Array|Object}
 */
const renamePopulatedFields = (data, fieldsToPopulate) => {
  const renameField = (item) => {
    fieldsToPopulate.forEach((field) => {
      const populatedField = field.replace('Id', '');
      if (item[field]) {
        item[populatedField] = item[field];
        delete item[field];
      }
    });
  };

  if (Array.isArray(data)) {
    // If it's an array, map over the array and rename fields on each object.
    return data.map((item) => {
      // Ensure that we're working with a plain JavaScript object, not a Mongoose document.
      item = item.toObject ? item.toObject() : item;
      renameField(item);
      return item;
    });
  } else {
    // If it's a single object, just rename the fields directly.
    const item = data.toObject ? data.toObject() : data;
    renameField(item);
    return item;
  }
};

module.exports = renamePopulatedFields;
