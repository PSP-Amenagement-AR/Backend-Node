const request = require('supertest');

const app = require('../app');
const helper = require('./helper');

let server;

describe('Login tests', () => {

  beforeAll(async () => {
    helper.connect();
    server = app.listen(3000);
  });

  afterAll(done => {
    helper.closeDatabase();
    server.close(done);
  });

  test('Should register user', done => {
    const email = 'test@test.com';
    const password = 'fakepwd';
    request(app)
      .post('/users/register')
      .send({ email, password })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe(email);
        done();
      });
  });

});
