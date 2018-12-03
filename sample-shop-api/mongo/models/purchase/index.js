const mongoose = require('mongoose');

let purchaseSchema = new mongoose.Schema({
  title: String,
  description: String,
  pictureRef: String,
  cost: Number
});

mongoose.model('purchase', purchaseSchema);

module.exports = mongoose.model('purchase');