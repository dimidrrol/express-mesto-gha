const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { validateUser, validateLogin } = require('./middlewares/validations');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const cors1 = require('cors');
require('dotenv').config();
const allowedCors = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'localhost:3000'
  ]
}

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
app.use(requestLogger);
app.use(cors1());


app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT);