const interactionType = (type) => (req, res, next) => {
  req.params.type = type;
  return next();
};

module.exports = interactionType;
