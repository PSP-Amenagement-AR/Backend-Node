let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let Comment = new Schema({
  title: String,
});

mongoose.model('comments', Comment);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to mongodb');
}).catch(err => {
  console.log('Not connected to mongodb: ', err);
});
