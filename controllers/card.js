const Card = require('../models/card');
const { ERROR_CODE, NOT_FOUND_CODE, ERROR_SERVER_CODE } = require('../constants/constants');

const getAllCards = (req, res) => {
    Card.find({})
        .then((cards) => {
            res.send({ data: cards });
        })
        .catch(() => {
            res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
        });
};

const createCard = (req, res) => {
    const owner = req.user._id;
    const { name, link } = req.body;
    Card.create({ name, link, owner })
        .then((card) => {
            res.send({ data: card });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания карточки' });
            } else {
                res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
            }
        });
};

const deleteCard = (req, res) => {
    const { cardId } = req.params;
    Card.findByIdAndDelete({ _id: `${cardId}` })
        .then((card) => {
            if (!card) {
                res.status(NOT_FOUND_CODE).send({ message: 'Карточка по указанному id не найдена' });
            } else {
                res.send({ message: 'Данные удалены', card });
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

const setLikeCard = (req, res) => {
    const { cardId } = req.params;
    Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
    )
        .then((card) => {
            if (!card) {
                res.status(NOT_FOUND_CODE).send({ message: 'Карточка по указанному id не найдена' });
            } else {
                res.send({ message: 'Лайк поставлен', card });
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });
            } else {
                res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
            }
        });
};

const deleteLikeCard = (req, res) => {
    const { cardId } = req.params;
    Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
    )
        .then((card) => {
            if (!card) {
                res.status(NOT_FOUND_CODE).send({ message: 'Карточка по указанному id не найдена' });
            } else {
                res.send({ message: 'Лайк убран', card });
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для снятии лайка' });
            } else {
                res.status(ERROR_SERVER_CODE).send({ message: 'Произошла ошибка' });
            }
        });
};

module.exports = {
    getAllCards,
    createCard,
    deleteCard,
    setLikeCard,
    deleteLikeCard,
};
