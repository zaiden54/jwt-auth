const router = require('express').Router;

const apiRouter = router();

apiRouter.get('/', (req, res) => {
  res.status(301).json({ hello: 'world' });
});

module.exports = apiRouter;
