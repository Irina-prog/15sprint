const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
require('mongoose-type-url');
require('mongoose-type-email');

const { Url, Email } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: Url,
    required: true,
  },
  email: {
    type: Email,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
});

if (!userSchema.options.toJSON) userSchema.options.toJSON = {};
userSchema.options.toJSON.transform = function transform(doc, ret) {
  // Извлекаем из передаваемых клиентской части данных информацию о пароле
  const { passwordHash, ...data } = ret;
  return data;
};

userSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await hash(password || '', 10);
};

userSchema.methods.comparePasswords = async function comparePasswords(password) {
  const result = await compare(password, this.passwordHash);
  return result;
};

module.exports = mongoose.model('user', userSchema);
