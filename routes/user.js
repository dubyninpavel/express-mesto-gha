const express = require('express');
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
userRoutes.post('/', express.json(), createUser);
userRoutes.patch('/me', express.json(), updateDataUser);
userRoutes.patch('/me/avatar', express.json(), updateAvatarUser);

module.exports = userRoutes;
