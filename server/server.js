const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const sessionParser = require('./middlewares/sessionParser');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
// app.use(sessionParser);

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
});
