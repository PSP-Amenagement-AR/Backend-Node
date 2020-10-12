const mongoose = require('mongoose');

const { Schema } = mongoose;

const FileSchema = new Schema({

  uid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },

}, { collection: 'files', autoCreate: true });


module.exports = mongoose.model('File', FileSchema);
