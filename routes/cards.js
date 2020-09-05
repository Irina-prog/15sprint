const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const {
  listCards, deleteCard, createCard, addLike, removeLike,
} = require('../controllers/cards');

const router = new Router();

router.get('/cards', asyncHandler(listCards));
router.post('/cards', asyncHandler(createCard));
router.delete('/cards/:id', asyncHandler(deleteCard));
router.put('/cards/:id/likes', asyncHandler(addLike));
router.delete('/cards/:id/likes', asyncHandler(removeLike));

module.exports = router;
