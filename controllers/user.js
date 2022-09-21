const User = require('../models/user');
const { ERROR_CODE, NOT_FOUND_CODE, ERROR_SERVER_CODE } = require('../constants/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный запрос' });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateDataUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { name, about } },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному id не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: { avatar } },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному id не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
      } else {
        res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateDataUser,
  updateAvatarUser,
};
