// const httpStatus = require('http-status');
// const Assessment = require('../models/assessment.model');
// const User = require('../models/user.model');
const TakeAssessment = require('../models/takeAssessment.model');
// const ApiError = require('../utils/ApiError');

/**
 *
 * @param {TakeAssessment} body
 * @returns {Promise<TakeAssessment>}
 */
const startAssessment = async (body) => {
  let takeAssessment = await TakeAssessment.create(body);

  takeAssessment = await takeAssessment
    .populate('user')
    .populate({
      path: 'assessment',
      populate: {
        path: 'questions',
      },
    })
    .populate('answers')
    .execPopulate();

  return takeAssessment;
};

module.exports = {
  startAssessment,
};
