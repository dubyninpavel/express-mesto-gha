const routes = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');

const { createUser, loginUser } = require('../controllers/user');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), loginUser);
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use(errors());

module.exports = routes;
