const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  pictureRef: String,
  role: String
});

mongoose.model('user', userSchema);

module.exports = mongoose.model('user');