require('./mongo/db');
const app = require('express')();
const UserController = require('./controllers/user-controller');
const PurchaseController = require('./controllers/purchase-controller');

app.use('/user', UserController);
app.use('/purchase', PurchaseController);

module.exports = app;