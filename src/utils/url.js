/**
 *
 * @param {Request} req
 * @returns {string}
 */
const getCurrentDomain = (req) => {
  return `${req.protocol}://${req.get('host')}`;
};

module.exports = {
  getCurrentDomain,
};
