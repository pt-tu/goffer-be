const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const checkEmailExists = {
  query: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    portfolioDomain: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUserSelf = {
  body: Joi.object()
    .keys({
      yoe: Joi.number(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      avatar: Joi.string(),
      skills: Joi.array().items(Joi.string()),
      refDoc: Joi.string(),
      dob: Joi.date(),
      gender: Joi.string(),
      bio: Joi.string(),
      resume: Joi.string().allow(''),
      tools: Joi.array().items(Joi.string()),
      location: Joi.string(),
      links: Joi.array().items(
        Joi.object().keys({
          label: Joi.string(),
          url: Joi.string(),
        })
      ),
      education: Joi.array().items(
        Joi.object().keys({
          school: Joi.string().required(),
          degree: Joi.string(),
          startDate: Joi.date(),
          endDate: Joi.date(),
          description: Joi.string(),
          major: Joi.string(),
        })
      ),
      experiences: Joi.array().items(
        Joi.object().keys({
          title: Joi.string().required(),
          company: Joi.string().required(),
          startDate: Joi.date().required(),
          endDate: Joi.date(),
          description: Joi.string(),
          logo: Joi.string(),
        })
      ),
      oneLiner: Joi.string(),
      status: Joi.string().valid('unavailable', 'open-to-job'),
      portfolio: Joi.object().keys({
        palette: Joi.object(),
        template: Joi.string().required(),
        brandName: Joi.string().required(),
        logo: Joi.string().required(),
        status: Joi.string().valid('draft', 'published').default('draft'),
        portfolioDomain: Joi.string()
          .pattern(/^[a-z_-]+$/)
          .message('Brand name can only contain lowercase alphabetic characters, underscores, and hyphens.')
          .required(),
        images: Joi.array()
          .items(Joi.string())
          .when('portfolio.template', {
            is: 'ONCE_IN_A_MOON',
            then: Joi.array().items(Joi.string()).length(3).required(),
          }),
      }),
    })
    .min(1),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      password: Joi.string().custom(password),
      name: Joi.string(),
      avatar: Joi.string(),
      skills: Joi.array().items(Joi.string()),
      refDoc: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  updateUserSelf,
  checkEmailExists,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
