/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
<<<<<<< HEAD
    link: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,./]+)(\.)([-a-z0-9+&@#\%=~_|$?!:,./]+)/).required(),
=======
    link: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,.]*)(\.)([-a-z0-9+&@#\/%=~_|$?!:,.]+)/).required(),
>>>>>>> develop
  }),
});

const validateHandlerCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

const validateUpdateDataUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateUpdateAvatarUser = celebrate({
  body: Joi.object().keys({
<<<<<<< HEAD
    avatar: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,./]+)(\.)([-a-z0-9+&@#\%=~_|$?!:,./]+)/).required(),
=======
    avatar: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,.]*)(\.)([-a-z0-9+&@#\/%=~_|$?!:,.]+)/).required(),
>>>>>>> develop
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
<<<<<<< HEAD
    avatar: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,./]+)(\.)([-a-z0-9+&@#\%=~_|$?!:,./]+)/),
=======
    avatar: Joi.string().pattern(/(https?:\/\/)([-a-z0-9+&@#\%=~_|$?!:,.]*)(\.)([-a-z0-9+&@#\/%=~_|$?!:,.]+)/),
>>>>>>> develop
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateCreateCard,
  validateHandlerCard,
  validateUpdateDataUser,
  validateUpdateAvatarUser,
  validateGetUserById,
  validateLoginUser,
  validateCreateUser,
};
