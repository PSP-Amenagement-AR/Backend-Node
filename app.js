const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const router = require('./src/router');
const ErrorHandler = require('./src/utils/errorHandler');
const createFirstAdmin = require('./src/utils/createFirstAdmin');
const { NOT_FOUND } = require('./src/messages');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/files', express.static(config.baseFilePath));
app.use(router);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(404, NOT_FOUND));
});

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
});

if (config.nodeEnv !== 'test') {

  app.listen(config.port, () => console.log(`Listening on port : ${config.port}`));

  mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, (err) => {
    if (err) {
      console.log('Database error');
      process.exit(1);
    }
    createFirstAdmin();
  });

}

module.exports = app;
