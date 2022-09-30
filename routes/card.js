const cardRoutes = require('express').Router();

const {
  validateCreateCard,
  validateHandlerCard,
} = require('../validator/validator');

const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/card');

cardRoutes.get('/', getAllCards);
cardRoutes.post('/', validateCreateCard, createCard);
cardRoutes.delete('/:cardId', validateHandlerCard, deleteCard);
cardRoutes.put('/:cardId/likes', validateHandlerCard, setLikeCard);
cardRoutes.delete('/:cardId/likes', validateHandlerCard, deleteLikeCard);

module.exports = cardRoutes;
