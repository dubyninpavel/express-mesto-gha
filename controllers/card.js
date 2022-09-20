const Card = require('../models/card');

const getAllCards = (req, res) => {
    Card.find({})
        .then((cards) => {
            res.status(200).send({ data: cards });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Произошла ошибка', ...err });
        });
};

const createCard = (req, res) => {
    const owner = req.user._id;
    const { name, link } = req.body;
    Card.create({ name, link, owner })
        .then((card) => {
            res.status(200).send({ data: card });
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки', ...err });
            } else {
                res.status(500).send({ message: 'Произошла ошибка', ...err });
            }
        });
};

const deleteCard = (req, res) => {
    const { cardId } = req.params;
    Card.findByIdAndDelete({ _id: `${cardId}` })
        .then((card) => {
            if (!card) {
                res.status(404).send({ message: 'Карточка по указанному id не найдена' });
            } else {
                res.status(200).send({ message: 'Данные удалены', card });
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(400).send({ message: 'Некорректный запрос', ...err });
            } else {
                res.status(500).send({ message: 'Произошла ошибка', ...err });
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
                res.status(404).send({ message: 'Карточка по указанному id не найдена' });
            } else {
                res.status(200).send({ message: 'Лайк поставлен', card });
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка', ...err });
            } else {
                res.status(500).send({ message: 'Произошла ошибка', ...err });
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
                res.status(404).send({ message: 'Карточка по указанному id не найдена' });
            } else {
                res.status(200).send({ message: 'Лайк убран', card });
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(400).send({ message: 'Переданы некорректные данные для снятии лайка', ...err });
            } else {
                res.status(500).send({ message: 'Произошла ошибка', ...err });
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
