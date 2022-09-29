const userRoutes = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const {
  getAllUsers,
  getUserById,
  getMyUserData,
  updateDataUser,
  updateAvatarUser,
} = require('../controllers/user');

userRoutes.get('/', getAllUsers);
userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateDataUser);
userRoutes.get('/me', getMyUserData);
userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatarUser);
userRoutes.get('/:userId', getUserById);

userRoutes.use(errors());

module.exports = userRoutes;
