const express = require('express');
const cardRoutes = require('express').Router();

const {
    getAllCards,
    createCard,
    deleteCard,
    setLikeCard,
    deleteLikeCard,
} = require('../controllers/card');

cardRoutes.get('/', getAllCards);
cardRoutes.post('/', express.json(), createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', setLikeCard);
cardRoutes.delete('/:cardId/likes', deleteLikeCard);

module.exports = cardRoutes;
