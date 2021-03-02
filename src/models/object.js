const mongoose = require('mongoose');

const { Schema } = mongoose;

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
