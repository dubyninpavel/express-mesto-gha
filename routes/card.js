const cardRoutes = require('express').Router();
const { errors } = require('celebrate');
const {
  validateCreateCard,
  validateDeleteCard,
  validateSetLikeCard,
  validateDeleteLikeCard,
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
cardRoutes.delete('/:cardId', validateDeleteCard, deleteCard);
cardRoutes.put('/:cardId/likes', validateSetLikeCard, setLikeCard);
cardRoutes.delete('/:cardId/likes', validateDeleteLikeCard, deleteLikeCard);

cardRoutes.use(errors());

module.exports = cardRoutes;
