const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '649f1fd399d15724f773287c'
  };

  next();
});

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardRouter);
app.use((err, req, res, next) => {
  const isNotFound = err.message.indexOf('not found')
  const isCastError = err.message.indexOf('Cast to ObjectId failed')
  if (err.message && (isNotFound || isCastError)) {
    return next()
  }
  res.status(500).send({messager: 'Произошла ошибка' })
})

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
})

app.listen(PORT);