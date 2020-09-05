const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).send({ message: 'Требуется авторизация' });
  }
};
