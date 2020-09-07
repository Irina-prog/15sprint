const jwt = require('jsonwebtoken');
const HttpError = require('../lib/http-error');
const jwtSecret = require('../lib/jwt-secret');

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    throw new HttpError(401, 'Требуется авторизация');
  }
};
