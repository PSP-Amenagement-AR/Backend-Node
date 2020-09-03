const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./src/router');
const ErrorHandler = require('./src/utils/errorHandler');
const { NOT_FOUND } = require('./src/messages');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(404, NOT_FOUND));
});

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
});

app.listen(port, () => console.log(`Listening on port : ${port}`));

if (process.env.NODE_ENV !== 'test') {

  mongoose.connect('mongodb://localhost:27017/ARAmenagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (err) => {
    if (err) {
      console.log('Database error');
      process.exit(1);
    }
  });

}

module.exports = app;
