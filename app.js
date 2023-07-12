const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { createUser, login} = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { validateUser, validateLogin } = require('./middlewares/validations');
require('dotenv').config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(limiter);

app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardRouter);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.use((req, res, next) => {
  res.status(404).send({ message: 'Извините, такой страницы не существует'});
});

app.listen(PORT);