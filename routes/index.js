const routes = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');

const { createUser, loginUser, logOutUser } = require('../controllers/user');

const {
  validateLoginUser,
  validateCreateUser,
} = require('../validator/validator');

routes.post('/signin', validateLoginUser, loginUser);
routes.post('/signup', validateCreateUser, createUser);

routes.use(auth);

routes.get('/signout', logOutUser);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = routes;
