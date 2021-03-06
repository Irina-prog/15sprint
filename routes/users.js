const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { celebrate, Joi } = require('celebrate');
const {
  listUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
const urlValidator = require('../lib/url-validator');

const router = new Router();

router.get('/users', asyncHandler(listUsers));
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), asyncHandler(getUser));
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    password: Joi.string(),
  }),
}), asyncHandler(updateUser));
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(urlValidator).required(),
  }),
}), asyncHandler(updateAvatar));

module.exports = router;
