const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/notFoundError');
const ConflictError = require('../middlewares/errors/conflictError');
const BadRequestError = require('../middlewares/errors/badRequestError');
const UnauthorizedError = require('../middlewares/errors/unauthorizedError');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос'));
      } else {
        next(err);
      }
    });
};

const getMyUserData = (req, res, next) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ваш профиль не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Передайте корекктные данные email и password');
  }
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name, about, avatar, email, password: hashedPassword,
      })
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`${err}. Переданы некорректные данные в методы создания пользователя`));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              process.env.JWT_SECRET,
            );

            res.cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            });

            res.send({ data: user });
          } else {
            next(new UnauthorizedError('Неправльный email или пароль'));
          }
        });
    })
    .catch(() => {
      next(new NotFoundError('Пользователь с такими данными не найден'));
    });
};

const updateDataUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name && !about) {
    throw new BadRequestError('Отсутствуют параметры для обновления');
  }
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
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные в методы создания пользователя'));
      }
      next(err);
    });
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequestError('Отсутствуют параметры для обновления');
  }
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
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные в методы создания пользователя'));
      }
      next(err);
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  getMyUserData,
  createUser,
  updateDataUser,
  updateAvatarUser,
  loginUser,
};
