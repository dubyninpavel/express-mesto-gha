const userRoutes = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateDataUser,
  updateAvatarUser,
} = require('../controllers/user');

userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateDataUser);
userRoutes.patch('/me/avatar', updateAvatarUser);

module.exports = userRoutes;
