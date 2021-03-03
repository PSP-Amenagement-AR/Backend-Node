const objectModel = require('../models/object');
const ErrorHandler = require('../utils/errorHandler');
const { SERVER_ERROR } = require('../messages');

/**
 * @swagger
 * tags:
 *  name: Objects
 *  description: Object management
 */

module.exports = {

  /**
   * @swagger
   * path:
   *  /objects:
   *    post:
   *      summary: Create a new object for the user
   *      tags: [Objects]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: string
   *          description: Token returned by login
   *          required: true
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Object'
   *      responses:
   *        "200":
   *          description: Object created
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Object'
   */

  create(req, res, next) {
    objectModel.create({ ...req.body, uid: req.userInfos.id },  (err, result) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json(result);
    });
  },

  /**
   * @swagger
   * path:
   *  /objects/{id}:
   *    delete:
   *      summary: Delete object
   *      tags: [Objects]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: String
   *          description: Token returned by login
   *        - in path:
   *          name: id
   *          description: Object id
   *      responses:
   *        "204":
   *          description: Object successfully deleted
   */

  delete(req, res, next) {
    const id = req.params.id;

    objectModel.findByIdAndDelete(id, err => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(204).json();
    })
  },

  /**
   * @swagger
   * path:
   *  /objects:
   *    get:
   *      summary: Get user's objects
   *      tags: [Objects]
   *      parameters:
   *        - in: header
   *          name: Authorization
   *          schema:
   *            type: String
   *          description: Token returned by login
   *      responses:
   *        "200":
   *          description: Return user's objects
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Object'
   */

  get(req, res, next) {
    objectModel.find({ uid: req.userInfos.id }, (err, docs) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json(docs);
    });
  }

};
