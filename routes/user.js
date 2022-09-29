const userRoutes = require('express').Router();

const {
  getAllUsers,
  getUserById,
  getMyUserData,
  updateDataUser,
  updateAvatarUser,
} = require('../controllers/user');

userRoutes.get('/', getAllUsers);
userRoutes.patch('/me', updateDataUser);
userRoutes.get('/me', getMyUserData);
userRoutes.patch('/me/avatar', updateAvatarUser);
userRoutes.get('/:userId', getUserById);

module.exports = userRoutes;
