const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  req.user = {
    _id: '63296c4f3b066e1eb4b4c133',
  };
  next();
});

app.use('/', routes);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Данный url не найден' });
});

async function startTheServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту`);
  });
}

startTheServer();
