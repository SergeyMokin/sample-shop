const mongoose = require('mongoose');

let shoppingBasketSchema = new mongoose.Schema({
    userId: String,
    purchases: Array
});

mongoose.model('shoppingbasket', shoppingBasketSchema);

module.exports = mongoose.model('shoppingbasket');