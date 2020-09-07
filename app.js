const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const asyncHandler = require('express-async-handler');
const helmet = require('helmet');
const { celebrate, Joi, CelebrateError } = require('celebrate');

require('dotenv').config();

const cards = require('./routes/cards');
const users = require('./routes/users');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const urlValidator = require('./lib/url-validator');
const HttpError = require('./lib/http-error');

const { PORT = 3000, DATABASE_URL = 'mongodb://localhost/mestodb' } = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const notFoundHandler = (res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });

const app = express();
app
  .use(helmet()) // для установки заголовков Content-Security-Policy,
  // позволяют ограничить источники скрипторв и других ресурсов.
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(requestLogger)
  .get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  })
  .post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30).required(),
      password: Joi.string().required(),
      avatar: Joi.string().custom(urlValidator).required(),
      email: Joi.string().email().required(),
    }),
  }),
  asyncHandler(createUser))
  .post('/signin', celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }), asyncHandler(login))
  .use('/', auth, cards, users) // защищаем авторизацией все API-вызовы (кроме /signin и /signup)
  .use(errorLogger)
  .use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err instanceof HttpError) {
      res.status(err.status || 500).send({ message: err.message });
      return;
    }

    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      notFoundHandler(res);
      return;
    }

    // Обрабатывыем ошибки валидации при использовании celebrate и mongoose
    if (err instanceof mongoose.Error.ValidationError || err instanceof CelebrateError) {
      const { details = [] } = err;
      res.status(400).send({ message: 'Введены не все обязательные данные', details: [...details] });
      return;
    }

    res.status(500).send({ message: 'Произошла ошибка на сервере' }); // Пользователем незачем знать детали об необработанной ошибке
  })
  .use((req, res) => {
    notFoundHandler(res);
  });
app.listen(PORT, () => {
  console.log(`Started on the port ${PORT}`); // eslint-disable-line no-console
});
