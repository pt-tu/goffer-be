/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Apply = require('../models/apply.model');
const ApiError = require('../utils/ApiError');
const { sdk } = require('../config/magicalapi');

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
const getApplications = async (filter, options, advanced) => {
  if (advanced.q) {
    filter.$or = [
      { email: { $regex: advanced.q, $options: 'i' } },
      { name: { $regex: advanced.q, $options: 'i' } },
      { lastCompany: { $regex: advanced.q, $options: 'i' } },
      { linkedIn: { $regex: advanced.q, $options: 'i' } },
      { location: { $regex: advanced.q, $options: 'i' } },
      { personalWebsite: { $regex: advanced.q, $options: 'i' } },
      { phoneNumber: { $regex: advanced.q, $options: 'i' } },
      { role: { $regex: advanced.q, $options: 'i' } },
    ];
  }
  if (advanced.match) {
    const [start, end] = advanced.match.split('-');
    filter.match = { $gte: start, $lte: end };
  }
  if (advanced.rating) {
    const [start, end] = advanced.rating.split('-');
    filter.rating = { $gte: start, $lte: end };
  }
  if (advanced.assessmentAvg) {
    const [start, end] = advanced.assessmentAvg.split('-');
    filter.assessmentAvg = { $gte: start, $lte: end };
  }
  const applications = await Apply.paginate(filter, options);
  return applications;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Apply>}
 */
const getApplication = async (id) => {
  let application = await Apply.findById(id)
    .populate('owner')
    .populate('job')
    .populate({
      path: 'answers',
      populate: {
        path: 'question',
      },
    });
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
 * @param {string} applicationId
 * @param {string} userId
 * @param {ReqBody} body
 * @returns {Promise<Apply>}
 */
const updateApplication = async (applicationId, userId, body) => {
  const application = await Apply.findById(applicationId);

  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  if (userId !== application.owner.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Application Forbidden');
  }

  Object.assign(application, body);
  await application.save();
  return application;
};

const updateApplicationRaw = async (applicationId, updateBody) => {
  const application = await Apply.findById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  Object.assign(application, updateBody);
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

const countApplicationsByPhases = async (filter) => {
  if (filter.job) {
    filter.job = mongoose.Types.ObjectId(filter.job);
  }

  return Apply.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: '$phase',
        count: { $sum: 1 },
      },
    },
  ]);
};

const resumeScore = async (url, jd) => {
  const response = await sdk.resumeScore({
    url,
    job_description: jd,
  });
  const requestId = response.data.data.request_id;
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const result = await sdk.resumeScore({ request_id: requestId });
  return result.data.data;
};

module.exports = {
  createApplication,
  getApplications,
  getApplication,
  queryApplication,
  updateApplication,
  submitAnswerToApplication,
  countApplicationsByPhases,
  updateApplicationRaw,
  resumeScore,
};
