const Card = require('../models/card');
const User = require('../models/user');

// To Reviewer: ошибки обрабатываются в app.js

async function listCards(req, res) {
  const cards = await Card.find({}).populate(['owner', 'likes']);
  res.send(cards);
}

async function deleteCard(req, res) {
  const card = await Card.findById(req.params.id, { owner: 1 }).orFail();
  if (card.owner.toString() !== req.user._id) {
    res.status(403).send({ message: 'Запрещено удалять карточку, созданную другим пользователем' });
    return;
  }

  await card.remove();
  res.send({});
}

async function createCard(req, res) {
  const card = new Card(req.body);
  card.owner = await User.findById(req.user._id);
  await card.save();
  res.send(card);
}

async function addLike(req, res) {
  const card = await Card
    .findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail();
  res.send(card);
}

async function removeLike(req, res) {
  const card = await Card
    .findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail();
  res.send(card);
}

module.exports = {
  listCards, deleteCard, createCard, addLike, removeLike,
};
