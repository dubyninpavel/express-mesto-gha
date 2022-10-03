/* eslint-disable spaced-comment */
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('./errors/unauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходимо авторизироваться'));
  }

  const token = authorization.replace('Bearer ', '');

  //const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходимо авторизироваться'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
