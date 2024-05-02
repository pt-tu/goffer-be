const Job = require('../models/job.model');

/**
 *
 * @param {Job} jobBody
 * @returns {Promise<Job>}
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
 * @returns {Promise<Job>}
 */
const getJob = async (id) => {
  let job = await Job.findById(id).populate('owner');
  job = job.toJSON();
  job.publicLink = `http://localhost:5173/vacancy/${job.id}-${encodeURI(job.title.toLowerCase().replace(/\s/g, '-'))}`;
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJob,
};
