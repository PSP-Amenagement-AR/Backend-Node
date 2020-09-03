const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const createToken = require('../utils/token');
const ErrorHandler = require('../utils/errorHandler');
const { SERVER_ERROR, USER_NOT_FOUND } = require('../messages');

const accessTokenSecret = 'youraccesstokensecret';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

module.exports = {

  /**
   * @swagger
   * path:
   *  /users/register:
   *    post:
   *      summary: Create a new user
   *      tags: [Users]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        "200":
   *          description: A user schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */

  create(req, res, next) {
    const { email, password } = req.body;

    userModel.create({ email: email.toLowerCase(), password: bcrypt.hashSync(password, 10) }, (err, result) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json(result);
    });
  },

    /**
   * @swagger
   * path:
   *  /users/login:
   *    post:
   *      summary: Login user
   *      tags: [Users]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        "200":
   *          description: A user schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  login(req, res, next) {
    const { email, password} = req.body;

    userModel.findOne({ email: email.toLowerCase()}, (err, result) =>{
      if(result && bcrypt.compareSync(password, result.password))
      {
        const user = {email: result.email, id: result._id};

        try
        {
          jwt.verify(result.token, accessTokenSecret);
          const token = result.token;
          res.json({
            token
          });
        }
        catch(error)
        {
          const token = createToken(user);
          userModel.findByIdAndUpdate({_id: result._id}, {token: token}, function(err, doc){
            if(err){
              return next(new ErrorHandler(500, SERVER_ERROR));
            }
        });
          res.json({
            token
          });
        }
      }
      else
      {
        next(new ErrorHandler(404, USER_NOT_FOUND));
      }
    });

  },

};
