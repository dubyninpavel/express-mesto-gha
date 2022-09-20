const User = require('../models/user');

const getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            res.status(200).send({ data: users });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Произошла ошибка', ...err });
        });
};

const getUserById = (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            if (user) {
                res.status(200).send({ data: user });
            } else {
                res.status(404).send({ message: 'Пользователь по указанному id не найден' });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: 'Произошла ошибка', ...err });
        });
};

const createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
        .then((user) => {
            res.status(200).send({ data: user });
        })
        .catch((err) => {
            if (!name || !about || !avatar) {
                res.status(400).send({ message: 'Переданы некорректные данные в методы создания пользователя', ...err });
            } else {
                res.status(500).send({ message: 'Произошла ошибка', ...err });
            }
        });
};

const updateDataUser = (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: { name, about } },
    )
        .then((user) => {
            if (!name || !about) {
                res.status(400).send({ message: 'Переданы некорректные данные при обновлении данных пользователя' });
            } else if (!user) {
                res.status(404).send({ message: 'Пользователь по указанному id не найден' });
            } else {
                res.status(200).send({ data: user });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: 'Произошла ошибка', ...err });
        });
};

const updateAvatarUser = (req, res) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: { avatar } },
    )
        .then((user) => {
            if (!avatar) {
                res.status(400).send({ message: 'Переданы некорректные данные при обновлении данных пользователя' });
            } else if (!user) {
                res.status(404).send({ message: 'Пользователь по указанному id не найден' });
            } else {
                res.status(200).send({ data: user });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: 'Произошла ошибка', ...err });
        });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateDataUser,
    updateAvatarUser,
};
