const userRoutes = require('express').Router();
const { errors } = require('celebrate');

const {
  validateUpdateDataUser,
  validateUpdateAvatarUser,
  validateGetUserById,
} = require('../validator/validator');

const {
  getAllUsers,
  getUserById,
  getMyUserData,
  updateDataUser,
  updateAvatarUser,
} = require('../controllers/user');

userRoutes.get('/', getAllUsers);
userRoutes.patch('/me', validateUpdateDataUser, updateDataUser);
userRoutes.get('/me', getMyUserData);
userRoutes.patch('/me/avatar', validateUpdateAvatarUser, updateAvatarUser);
userRoutes.get('/:userId', validateGetUserById, getUserById);

userRoutes.use(errors());

module.exports = userRoutes;
