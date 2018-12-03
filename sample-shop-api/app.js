require('./mongo/db');
const app = require('express')();
const UserController = require('./controllers/user-controller');
const PurchaseController = require('./controllers/purchase-controller');
const ShoppingBasketController = require('./controllers/shopping-basket-controller');
const ShopController = require('./controllers/shop-controller');

app.use('/user', UserController);
app.use('/purchase', PurchaseController);
app.use('/shopping-basket', ShoppingBasketController);
app.use('/shop', ShopController);


module.exports = app;