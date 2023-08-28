const router = require('express').Router;
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const authRouter = router();

authRouter.get('/check', (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: 'no cookies' });
  }
  res.json(req.session.user);
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

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return res.json(req.session.user);
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

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return res.json(req.session.user);
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
});

module.exports = authRouter;
