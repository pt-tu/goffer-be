const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    cover: Joi.string().required(),
    description: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    tools: Joi.array().items(Joi.string()),
    skills: Joi.array().items(Joi.string()),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    owner: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      cover: Joi.string(),
      description: Joi.string(),
      title: Joi.string(),
      content: Joi.string(),
      tools: Joi.array().items(Joi.string()),
      skills: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteProject = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
