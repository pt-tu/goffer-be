const Job = require('../models/job.model');

/**
 *
 * @param {Job} jobBody
 * @returns {Promise<Job}
 */
const createJob = async (jobBody) => {
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
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJob = async (id, updateBody) => {
  const job = await Job.findByIdAndUpdate(id, updateBody, {
    new: true,
    runValidators: true,
  });
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  updateJob,
};
