const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const createToken = require('../utils/token');
const ErrorHandler = require('../utils/errorHandler');
const { SERVER_ERROR, USER_NOT_FOUND, UNAUTHORIZED, USER_ALREADY_EXISTS } = require('../messages');
const config = require('./../../config');

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
    const { email, password, firstName, lastName } = req.body;
    userModel.findOne({ email: email.toLowerCase() }, (error, user) => {
      if (error) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      if (user === null) {
        return userModel.create({
          email: email.toLowerCase(),
          password: bcrypt.hashSync(password, config.saltValue),
          firstName,
          lastName
        }, (err, result) => {
          if (err) {
            return next(new ErrorHandler(500, SERVER_ERROR));
          }
          res.status(200).json({
            _id: result._id,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName
          });
        });
      }
      next(new ErrorHandler(400, USER_ALREADY_EXISTS));
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
   *          description: A token
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  token:
   *                    type: string
   *                    description: token
   *                  firstName:
   *                    type: string
   *                    description: First name of the user
   *                  lastName:
   *                    type: string
   *                    description: Last name of the user
   */
  login(req, res, next) {
    const { email, password} = req.body;

    userModel.findOne({ email: email.toLowerCase()}, (err, result) =>{
      if(result && bcrypt.compareSync(password, result.password))
      {
        const user = {email: result.email, id: result._id};

        try
        {
          jwt.verify(result.token, config.secretKey);
          const token = result.token;
          res.json({
            token,
            id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
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
            token,
            id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
          });
        }
      }
      else
      {
        next(new ErrorHandler(404, USER_NOT_FOUND));
      }
    });

  },

  /**
   * @swagger
   * path:
   *  /users/disconnect/:
   *    get:
   *      summary: Disconnect user
   *      tags: [Users]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: String
   *          description: Token returned by login
   *      responses:
   *        "204":
   *          description: Disconnect successful
   */
  disconnect(req, res, next) {
    userModel.findByIdAndUpdate(req.userInfos.id, { token: undefined }, (err) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(204).json();
    });
  },

  /**
   * @swagger
   * path:
   *  /users/{id}:
   *    put:
   *      summary: Update user (admin only)
   *      tags: [Users]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: String
   *          description: Token returned by login
   *        - in path:
   *          name: id
   *          description: User id
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        "200":
   *          description: Updated user
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  adminUpdate(req, res, next) {
    const id = req.params.id;
    const updateData = {...req.body};
    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, config.saltValue)
    }
    userModel.findByIdAndUpdate(id, updateData, { new: true }, (err, result) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json({ _id: result.id, email: result.email, firstName: result.firstName, lastName: result.lastName, admin: result.admin })
    });
  },

  /**
   * @swagger
   * path:
   *  /users/:
   *    put:
   *      summary: Update user
   *      tags: [Users]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: String
   *          description: Token returned by login
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        "200":
   *          description: Updated user
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   */
  update(req, res, next) {
    const updateData = {...req.body};
    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, config.saltValue)
    }
    userModel.findByIdAndUpdate(req.userInfos.id ,updateData, { new: true }, (err, result) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json({ _id: result._id, email: result.email, firstName: result.firstName, lastName: result.lastName })
    })
  },

  /**
   * @swagger
   * path:
   *  /users/{id}:
   *    delete:
   *      summary: Delete user
   *      tags: [Users]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: String
   *          description: Token returned by login
   *        - in path:
   *          name: id
   *          description: User id
   *      responses:
   *        "204":
   *          description: User successfully deleted
   */
  delete(req, res, next) {
    const id = req.params.id;
    if (req.userInfos.admin || req.userInfos.id === id) {
      userModel.findByIdAndDelete(id, (err) => {
        if (err) {
          return next(new ErrorHandler(500, SERVER_ERROR));
        }
        res.status(204).json();
      });
    }
    next (new ErrorHandler(401, UNAUTHORIZED));
  }
};
