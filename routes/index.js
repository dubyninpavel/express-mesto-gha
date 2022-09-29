const routes = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const auth = require('../middlewares/auth');

const { createUser, loginUser } = require('../controllers/user');

routes.post('/signin', loginUser);
routes.post('/signup', createUser);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = routes;
