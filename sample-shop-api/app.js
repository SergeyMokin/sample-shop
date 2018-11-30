const Db = require('./mongo/db');
const App = require('express')();
const UserController = require('./controllers/user-controller');

App.use('/user', UserController);

module.exports = App;