const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Appearance:
 *        type: object
 *        required:
 *          - name
 *          - color
 *          - texture
 *        properties:
 *              name:
 *                type: string
 *                description: name for the appearance
 *              color:
 *                type: string
 *                description: color for the appearance
 *              texture:
 *                type: string
 *                description: texture for the appearance
 *      Object:
 *        type: object
 *        required:
 *          - typeName
 *          - title
 *          - appearances
 *        properties:
 *          typeName:
 *            type: string
 *            description: type name of the object
 *          title:
 *            type: string
 *            description: title for the object
 *          appearances:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Appearance'
 *
 *
 *
 */

const ObjectSchema = new Schema({

  typeName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  appearances: [{
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    texture: {
      type: String,
      required: true,
    },
  }],
  uid: {
    type: Schema.Types.ObjectId,
    required: true,
  },

}, { collection: 'objects', autoCreate: true });


module.exports = mongoose.model('Object', ObjectSchema);
