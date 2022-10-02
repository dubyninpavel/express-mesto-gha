/* eslint-disable spaced-comment */
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const UnauthorizedError = require('./errors/unauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходимо авторизироваться');
  }

  const token = authorization.replace('Bearer ', '');
  //const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходимо авторизироваться'));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
