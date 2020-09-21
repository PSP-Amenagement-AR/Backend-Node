const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *            description: Password for the user
 *        example:
 *           email: fake@email.com
 *           password: fakepwd
 */

const userSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  }

}, { collection: 'users', autoCreate: true });


module.exports = mongoose.model('User', userSchema);
