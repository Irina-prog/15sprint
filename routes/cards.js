const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { celebrate, Joi } = require('celebrate');
const {
  listCards, deleteCard, createCard, addLike, removeLike,
} = require('../controllers/cards');
const urlValidator = require('../lib/url-validator');

const router = new Router();

router.get('/cards', asyncHandler(listCards));
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(urlValidator).required(),
  }),
}), asyncHandler(createCard));
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), asyncHandler(deleteCard));
router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), asyncHandler(addLike));
router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), asyncHandler(removeLike));

module.exports = router;
