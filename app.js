require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./middlewares/errors/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Текущий url не найден'));
});

app.use(errors());

app.use(errorHandler);

async function startTheServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Сервер запущен на ${PORT} порту`);
  });
}

startTheServer();
