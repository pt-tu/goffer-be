const httpStatus = require('http-status');
const Apply = require('../models/apply.model');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {Apply} applyBody
 * @returns {Promise<Apply>}
 */
const createApplication = async (applyBody) => {
  const application = await Apply.create(applyBody);
  return application;
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Apply>}
 */
const getApplications = async (filter, options) => {
  const applications = await Apply.paginate(filter, options);
  return applications;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Apply>}
 */
const getApplication = async (id) => {
  let application = await Apply.findById(id).populate('owner').populate('job').populate('answers');
  application = application.toJSON();
  return application;
};

/**
 *
 * @param {string} job
 * @param {string} owner
 * @returns {Promise<Apply>}
 */
const queryApplication = async (job, owner) => {
  return Apply.findOne({ job, owner }).populate('answers');
};

/**
 *
 * @param {ReqBody} req
 * @returns {Promise<Apply>}
 */
const updateApplication = async (req) => {
  const { user, body } = req;
  const application = await Apply.findById(body.id);

  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  if (user.id !== application.owner.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Application Forbidden');
  }

  Object.assign(application, body);
  await application.save();
  return application;
};

/**
 *
 * @param {string} applicationId
 * @param {Answer} answer
 * @returns {Promise<Apply>}
 */
const submitAnswerToApplication = async (applicationId, answer) => {
  const application = await Apply.findById(applicationId);

  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  if (answer.owner.toString() !== application.owner.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Application Forbidden');
  }

  if (!application.answers.includes(answer.id)) {
    application.answers.push(answer.id);
  }

  await application.save();
  return application;
};

const countApplicationsByPhases = async () => {
  return Apply.aggregate([
    {
      $group: {
        _id: '$phase',
        count: { $sum: 1 },
      },
    },
  ]);
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  queryApplication,
  updateApplication,
  submitAnswerToApplication,
  countApplicationsByPhases,
};
