/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { rqs, client } = require('../config/recombeeClient');

/**
 *
 * @param {string} email
 * @returns {Promise<boolean>}
 */
const emailExists = async (email) => {
  if (await User.isEmailTaken(email)) {
    return true;
  }
  return false;
};

/**
 * Create a user
 * @param {Object} userBody
 * @param {Object} userQuery
 * @returns {Promise<User>}
 */
const createUser = async (userBody, userQuery) => {
  const type = userQuery.type || 'individual';
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create({ ...userBody, initialType: type });
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options, advanced) => {
  if (advanced) {
    if (advanced.skills) {
      filter.skills = { $in: advanced.skills };
    }
    if (advanced.tools) {
      filter.tools = { $in: advanced.tools };
    }
    if (advanced.searchQuery) {
      filter.$or = [
        { name: { $regex: advanced.searchQuery, $options: 'i' } },
        { email: { $regex: advanced.searchQuery, $options: 'i' } },
        { location: { $regex: advanced.searchQuery, $options: 'i' } },
      ];
    }

    if (advanced.experience) {
      switch (advanced.experience) {
        case '0-1 year':
          filter.yoe = { $lte: 1 };
          break;
        case '1-2 years':
          filter.yoe = { $gte: 1, $lte: 2 };
          break;
        case '2-4 years':
          filter.yoe = { $gte: 2, $lte: 4 };
          break;
        case '4-7 years':
          filter.yoe = { $gte: 4, $lte: 7 };
          break;
        case '7-10 years':
          filter.yoe = { $gte: 7, $lte: 10 };
          break;
        case '10+ years':
          filter.yoe = { $gte: 10 };
          break;
        default:
          break;
      }
    }
  }
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const addUserToRecombee = async (user) => {
  const req = new rqs.SetUserValues(
    user.id.toString(),
    {
      skills: user.skills.join(', '),
      tools: user.tools.join(', '),
      location: user.location,
    },
    {
      cascadeCreate: true,
    }
  );

  await client.send(req);
};

const recommendCandidates = async (jobId, limit = 10, page = 1) => {
  const recommendations = await client.send(
    new rqs.RecommendUsersToItem(jobId.toString(), limit, {
      scenario: 'homepage',
      cascadeCreate: true,
      returnProperties: true,
      page,
    })
  );
  const userIds = recommendations.recomms.map((r) => r.id);
  return User.find({ _id: { $in: userIds } });
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  emailExists,
  addUserToRecombee,
  recommendCandidates,
};
