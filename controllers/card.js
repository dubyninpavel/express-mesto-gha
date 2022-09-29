const Card = require('../models/card');
const NotFoundError = require('../middlewares/errors/notFoundError');
const BadRequestError = require('../middlewares/errors/badRequestError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  if (!name || !link) {
    throw new BadRequestError('Передайте корекктные данные name и link');
  }
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные в методы создания карточки'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findOneAndDelete({
    _id: `${cardId}`,
    owner: _id,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному id не найдена или у вас не прав на ее удаление');
      }
      res.send({ message: 'Данные удалены', card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос'));
      }
      next(err);
    });
};

const setLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному id не найдена');
      } else {
        res.send({ message: 'Лайк поставлен', card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному id не найдена');
      } else {
        res.send({ message: 'Лайк убран', card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятии лайка'));
      }
      next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
};
