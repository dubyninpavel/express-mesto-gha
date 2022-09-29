const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходимо авторизироваться'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'Key');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
