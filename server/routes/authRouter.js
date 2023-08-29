const router = require('express').Router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const authRouter = router();

authRouter.get('/check', (req, res) => {
  const { token } = req.cookies;

  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  if (!token || !decodedData) {
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

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: hash,
    },
  });

  if (!created) {
    res.status(400).json({ message: 'Такой пользователь уже существует' });
  }

  const userInfo = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '30m' });

  res.cookie('token', token, { httpOnly: true });

  return res.json(userInfo);
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Заполните все поля' });
  }

  // const hash = await bcrypt.hash(password, 10);

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user?.password))) {
    res.status(400).json({ message: 'Неверная электронная почта или пароль' });
  }

  const userInfo = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '30m' });
  res.cookie('token', token, { httpOnly: true });

  return res.json(userInfo);
});

authRouter.get('/logout', (req, res) => {
  // req.session.destroy();
  res.clearCookie('token');
  res.sendStatus(200);
});

module.exports = authRouter;
