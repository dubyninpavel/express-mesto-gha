const cardRoutes = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/card');

cardRoutes.get('/', getAllCards);
cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', setLikeCard);
cardRoutes.delete('/:cardId/likes', deleteLikeCard);

cardRoutes.use(errors());

module.exports = cardRoutes;
