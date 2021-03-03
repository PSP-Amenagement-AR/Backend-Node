const request = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const helper = require('./helper');
const config = require('../config');
const userModel = require('../src/models/user');
const objectModel = require('../src/models/object');

let server;
let obj;
let user;
const userPwd = 'test';
const object = {
  typeName:"chair_2",
  title:"my second Kitchen Chair",
  appearances:[
    {
      name:"metal",
      color:"#FFFFFF",
      texture:"base_material"
    },
    {
      name:"plastic",
      color:"#FFFFFF",
      texture:"base_material"
    },
    {
      name:"seat",
      color:"#FFFFFF",
      texture:"base_material"
    }
  ]
};

describe('Object controller tests', () => {

  beforeAll(async () => {
    helper.connect();
    server = app.listen(3002);
    user = new userModel({ email: 'user@test.com', password: bcrypt.hashSync(userPwd, config.saltValue), fisrtName: 'foo', lastName: 'bar' });
    user.save();
  });

  beforeEach(() => {
    obj = new objectModel({ uid: user._id, ...object });
    obj.save();
  });

  afterEach(async () => {
    await objectModel.deleteMany({});
  });

  afterAll(done => {
    helper.closeDatabase();
    server.close(done);
  });

  test('Should create object', async done => {
    const token = await helper.loginUserHelper(request, app)('user@test.com', userPwd);
    request(app)
      .post('/objects')
      .set('Authorization', token)
      .send({
        typeName:"chair_1",
        title:"my Kitchen Chair",
        appearances:[
          {
            name:"metal",
            color:"#FFFFFF",
            texture:"base_material"
          },
          {
            name:"plastic",
            color:"#FFFFFF",
            texture:"base_material"
          },
          {
            name:"seat",
            color:"#FFFFFF",
            texture:"base_material"
          }
        ]
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });

  test('Should delete object', async done => {
    const token = await helper.loginUserHelper(request, app)('user@test.com', userPwd);
    request(app)
      .delete(`/objects/${obj._id}`)
      .set('Authorization', token)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(204);
        done()
      })
  });

  test('Should get objects', async done => {
    const token = await helper.loginUserHelper(request, app)('user@test.com', userPwd);
    request(app)
      .get('/objects')
      .set('Authorization', token)
      .send()
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).toBe(obj._id.toString());
        done();
      });
  });

});
