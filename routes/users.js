const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { celebrate, Joi } = require('celebrate');
const {
  listUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

const router = new Router();

router.get('/users', asyncHandler(listUsers));
router.get('/users/:id', asyncHandler(getUser));
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    password: Joi.string(),
  }),
}), asyncHandler(updateUser));
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), asyncHandler(updateAvatar));

module.exports = router;
