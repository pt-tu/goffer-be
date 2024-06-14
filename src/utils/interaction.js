const mongoose = require('mongoose');

const interactionAllowed = ['Job', 'Organization', 'User'];

async function getInteractionModel(type) {
  if (!interactionAllowed.includes(type)) {
    throw new Error('Invalid interaction type');
  }

  if (!mongoose.models[`${type}Saved`]) {
    const newSchema = new mongoose.Schema(
      {
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
          required: true,
        },
        entity: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: type,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    mongoose.model(`${type}Saved`, newSchema);
  }

  const Model = mongoose.model(`${type}Saved`);

  if (!(Model.prototype instanceof mongoose.Model)) {
    throw new Error(`Invalid model for interaction type: ${type}Saved`);
  }

  return Model;
}

module.exports = { getInteractionModel, interactionAllowed };
