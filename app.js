const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./src/router');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(router);

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
