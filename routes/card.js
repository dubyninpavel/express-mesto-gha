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
    link: Joi.string().required().pattern(/https?:\/\//),
  }),
}), createCard);
cardRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), setLikeCard);
cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteLikeCard);

cardRoutes.use(errors());

module.exports = cardRoutes;
