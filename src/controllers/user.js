const bcrypt = require('bcrypt');
const userModel = require('../models/user');

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
   *  /users/:
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

    userModel.create({ email, password: bcrypt.hashSync(password, 10) }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Server Error' });
      }
      res.status(200).json(result);
    });
  },

};
