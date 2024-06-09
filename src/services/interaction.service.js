const { getInteractionModel } = require('../utils/interaction');

/**
 *
 * @param {string} type
 * @param {ObjectId} entity
 * @param {ObjectId} user
 * @returns {boolean}
 */
const checkInteraction = async (type, entity, user) => {
  if (!type || !entity || !user) return false;

  const Model = await getInteractionModel(type);

  const interaction = await Model.findOne({ entity, user });

  return !!interaction;
};

/**
 *
 * @param {string} type
 * @param {ObjectId} entity
 * @param {ObjectId} user
 * @returns {Promise<boolean>}
 */
const toggleInteraction = async (type, entityId, userId) => {
  if (!type || !entityId || !userId) {
    throw new Error('Missing required parameters: type, entity, user');
  }

  const InteractionModel = await getInteractionModel(type);

  const exist = await InteractionModel.findOne({ entity: entityId, user: userId });

  if (exist) {
    await exist.deleteOne();
    return false;
  }
  const interaction = new InteractionModel({ entity: entityId, user: userId });
  await interaction.save();
  return true;
};

module.exports = {
  checkInteraction,
  toggleInteraction,
};
