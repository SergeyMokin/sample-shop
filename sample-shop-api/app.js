require('./mongo/db');
const app = require('express')();
const UserController = require('./controllers/user-controller');

app.use('/user', UserController);

module.exports = app;