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

app.listen(PORT, () => {
  console.log(`hello ${PORT}`);
});