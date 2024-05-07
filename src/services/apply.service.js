const Apply = require('../models/apply.model');

/**
 *
 * @param {Apply} applyBody
 * @returns {Promise<Apply>}
 */
const createApply = async (applyBody) => {
  const apply = await Apply.create(applyBody);
  return apply;
};

module.exports = {
  createApply,
};
