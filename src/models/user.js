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
 *          firstName:
 *            type: string
 *            description: User firstname
 *          lastName:
 *            type: string
 *            description: User lastname
 *          admin:
 *            type: boolean
 *            description: Is the user an admin or not
 *        example:
 *           email: fake@email.com
 *           password: fakepwd
 *           firstName: Foo
 *           lastName: Bar
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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  token: {
    type: String,
  }

}, { collection: 'users', autoCreate: true });


module.exports = mongoose.model('User', userSchema);
