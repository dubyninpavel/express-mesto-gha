const routes = require('express').Router();
const { errors } = require('celebrate');
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');

const { createUser, loginUser } = require('../controllers/user');

const {
  validateLoginUser,
  validateCreateUser,
} = require('../validator/validator');

routes.post('/signin', validateLoginUser, loginUser);
routes.post('/signup', validateCreateUser, createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

routes.use(errors());

module.exports = routes;
