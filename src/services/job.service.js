const httpStatus = require('http-status');
const { Organization } = require('../models');
const Job = require('../models/job.model');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

/**
 *
 * @param {Job} jobBody
 * @returns {Promise<Job>}
 */
const createJob = async (jobBody) => {
  const organization = await Organization.findById(jobBody.org);
  const { owner } = jobBody;

  if (organization.owner.toString() !== owner.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const job = await Job.create(jobBody);
  return job;
};

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  const jobs = await Job.paginate(filter, options);
  return jobs;
};

/**
 *
 * @param {string} id
 * @returns {Promise<Job>}
 */
const getJob = async (id) => {
  let job = await Job.findById(id).populate('owner').populate('org');
  job = job.toJSON();
  job.publicLink = `http://localhost:5173/job/${job.id}-${encodeURI(job.title.toLowerCase().replace(/\s/g, '-'))}`;
  return job;
};

/**
 *
 * @param {string} id
 * @returns {Promise<import('../models/user.model').User[]>}
 */
const getSourcing = async (id) => {
  const job = await getJob(id);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const users = await userService.queryUsers({}, {});
  return users;
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJob = async (jobId, updateBody) => {
  const job = await getJob(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  Object.assign(job, updateBody);
  await job.save();
  return job;
};

/**
 * Delete job by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const deleteJob = async (jobId) => {
  const job = await getJob(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  await job.remove();
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJob,
  updateJob,
  deleteJob,
  getSourcing,
};
