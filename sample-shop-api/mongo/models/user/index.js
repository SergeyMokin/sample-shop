const Mongoose = require('mongoose');

let UserSchema = new Mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  pictureRef: String
});

Mongoose.model('User', UserSchema);

module.exports = Mongoose.model('User');