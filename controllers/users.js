const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../lib/http-error');
const jwtSecret = require('../lib/jwt-secret');

async function listUsers(req, res) {
  const users = await User.find({});
  res.send(users);
}

async function getUser(req, res) {
  const user = await User.findById(req.params.id).orFail();
  res.send(user);
}

async function createUser(req, res) {
  try {
    const { password, ...data } = req.body;
    const user = new User(data); // Модели mongoose умеют сами отфильтровывать "лишние" поля.
    // Так если в req.body передать не объявленное поле, то оно не будет сохранено в БД
    await user.setPassword(password);
    await user.save();
    res.send(user);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw new HttpError(409, 'Такой пользователь уже зарегистрирован');
    }

    throw err;
  }
}

async function updateUser(req, res) {
  const { name, about, password } = req.body;
  const user = await User.findOne({ _id: req.user._id }).orFail();
  if (name) {
    user.name = name;
  }
  if (about) {
    user.about = about;
  }
  if (password) {
    await user.setPassword(password);
  }
  await user.save();
  res.send(user);
}

async function updateAvatar(req, res) {
  const { avatar } = req.body;
  const user = await User.findOne({ _id: req.user._id }).orFail();
  user.avatar = avatar;
  await user.save();
  res.send(user);
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+passwordHash').orFail();
    const matched = await user.comparePasswords(req.body.password);
    if (!matched) {
      throw new Error();
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
    res.send({});
  } catch {
    throw new HttpError(401, 'Логин и/или пароль не верны');
  }
}

module.exports = {
  listUsers, getUser, createUser, updateUser, updateAvatar, login,
};
