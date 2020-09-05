const mongoose = require('mongoose');
require('mongoose-type-url');

const { ObjectId, Url } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: Url,
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
