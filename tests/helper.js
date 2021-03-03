const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

const config = require('../config');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getUri();

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

module.exports.generateToken = (user) => {
  return jwt.sign({ email: user.email, _id: user._id }, config.secretKey);
};

module.exports.loginUserHelper = (request, app) => async (email, password) => {
  const response = await request(app).post('/users/login').send({ email, password });
  return response.body.token;
};
