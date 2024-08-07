/* eslint-disable no-param-reassign */
const { getInteractionModel, interactionAllowed } = require('../../utils/interaction');

async function getInteractions(type, user) {
  if (!user) return [];

  const InteractionModel = await getInteractionModel(type);
  const interactions = await InteractionModel.find({ user }).distinct('entity');
  return interactions;
}

async function countInteractions(type, entityDocs) {
  if (!entityDocs || entityDocs.length === 0) return {};

  const InteractionModel = await getInteractionModel(type);
  const resultPromises = entityDocs.map(async (doc) => {
    const users = await InteractionModel.find({ entity: doc._id }).distinct('user');
    return { [doc._id]: users.length };
  });

  const results = await Promise.all(resultPromises);
  return Object.assign({}, ...results);
}

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter)
      .collation({
        locale: 'en',
        strength: 1,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = await docsPromise.exec();

    let interactionPromise;
    let countFollowPromise;
    if (interactionAllowed.includes(this.modelName)) {
      interactionPromise = getInteractions(this.modelName, options.user);
      countFollowPromise = countInteractions(this.modelName, docsPromise);
    }

    return Promise.all([countPromise, docsPromise, interactionPromise, countFollowPromise]).then((values) => {
      const [totalResults, docs, interactions, follows] = values;
      const totalPages = Math.ceil(totalResults / limit);

      const results = docs.map((doc) => ({
        ...doc.toJSON(),
        saved: interactions && interactions.some((interactionId) => interactionId.equals(doc._id)),
        follow: follows && follows[doc._id],
      }));

      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
