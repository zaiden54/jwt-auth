const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
});
