const router = require('express').Router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { User } = require('../db/models');
const { generateToken } = require('../service/tokenService');
const sendActivationMail = require('../service/mailService');

const authRouter = router();

authRouter.get('/check', (req, res) => {
  const { token } = req.cookies;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedData) {
    res.status(401).json({ message: 'no cookies' });
  }

  res.json(decodedData);
});

authRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Заполните все поля' });
  }

  const hash = await bcrypt.hash(password, 10);
  const activationLink = uuid.v4();

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: hash,
      activationLink,
    },
  });

  await sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

  if (!created) {
    res.status(400).json({ message: 'Такой пользователь уже существует' });
  }

  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    isActivated: user.isActivated,
  };

  const token = generateToken(userInfo);

  res.cookie('token', token, { httpOnly: true });

  return res.json(userInfo);
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Заполните все поля' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user?.password))) {
    res.status(400).json({ message: 'Неверная электронная почта или пароль' });
  }

  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    isActivated: user.isActivated,
  };

  // console.log(user);

  const token = generateToken(userInfo);
  res.cookie('token', token, { httpOnly: true });

  res.json(userInfo);
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

authRouter.get('/activate/:activationLink', async (req, res) => {
  const { activationLink } = req.params;

  const user = await User.findOne({ where: { activationLink } });

  if (!user) {
    res.json({ message: 'Такого пользователя не существует или ссылка ошибочная' });
  }

  user.isActivated = true;
  await user.save();

  res.redirect('http://localhost:3000/');
});

module.exports = authRouter;
