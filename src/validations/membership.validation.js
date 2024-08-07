const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMembership = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    org: Joi.string().required().custom(objectId),
    role: Joi.string().valid('owner', 'interviewer', 'member'),
    status: Joi.string().valid('sent', 'accepted', 'rejected', 'blocked'),
    title: Joi.string().allow(null, ''),
  }),
};

const getMemberships = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    org: Joi.string().custom(objectId),
    role: Joi.string().valid('owner', 'interviewer', 'member'),
    status: Joi.string().valid('sent', 'accepted', 'rejected', 'blocked'),
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const getMembership = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateMembership = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      role: Joi.string().valid('owner', 'interviewer', 'member'),
      status: Joi.string().valid('sent', 'accepted', 'rejected', 'blocked'),
      title: Joi.string().allow(null, ''),
    })
    .min(1),
};

const deleteMembership = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const getOrganizationMemberships = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId).required(),
  }),
};

const replyInvitation = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  createMembership,
  getMemberships,
  getMembership,
  updateMembership,
  deleteMembership,
  getOrganizationMemberships,
  replyInvitation,
};
