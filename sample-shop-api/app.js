require('./mongo/db');
const app = require('express')();
const UserController = require('./controllers/user-controller');
const PurchaseController = require('./controllers/purchase-controller');
const ShoppingBasketController = require('./controllers/shopping-basket-controller');
const ShopController = require('./controllers/shop-controller');

app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use('/user', UserController);
app.use('/purchase', PurchaseController);
app.use('/shopping-basket', ShoppingBasketController);
app.use('/shop', ShopController);


module.exports = app;