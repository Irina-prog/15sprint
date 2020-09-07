const jwt = require('jsonwebtoken');
const HttpError = require('../lib/http-error');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    throw new HttpError(401, 'Требуется авторизация');
  }
};
