const request = require('supertest');
const bcrypt = require('bcrypt');

const config = require('../config');
const messages = require('../src/messages');
const userModel = require('../src/models/user');

const app = require('../app');
const helper = require('./helper');

let server;

let user;
const userPwd = 'test';
let adminUser;

describe('Login tests', () => {

  beforeAll(async () => {
    helper.connect();
    server = app.listen(3001);
    user = new userModel({ email: 'user@test.com', password: bcrypt.hashSync(userPwd, config.saltValue), fisrtName: 'foo', lastName: 'bar' });
    adminUser = new userModel({ email: 'admin@admin.com', password: bcrypt.hashSync('admin', config.saltValue), fisrtName: 'foo', lastName: 'bar', admin: true });
    user.save();
    adminUser.save();
  });

  afterAll(done => {
    helper.closeDatabase();
    server.close(done);
  });

  test('Should register user', done => {
    const email = 'test@test.com';
    const password = 'fakepwd';
    const firstName = 'foo';
    const lastName = 'bar';
    request(app)
      .post('/users/register')
      .send({ email, password, firstName, lastName })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe(email);
        expect(response.body.firstName).toBe(firstName);
        expect(response.body.lastName).toBe(lastName);
        done();
      });
  });

  test('Should not register user', done => {
    request(app)
      .post('/users/register')
      .send({ email: user.email, password: userPwd, firstName: 'foo', lastName: 'bar' })
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(messages.USER_ALREADY_EXISTS);
        done();
      })
  });

  test('Should login user', done => {
    request(app)
      .post('/users/login')
      .send({ email: user.email, password: userPwd })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.token).not.toBe(undefined);
        done();
      });
  });

});
