const routes = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

module.exports = routes;
