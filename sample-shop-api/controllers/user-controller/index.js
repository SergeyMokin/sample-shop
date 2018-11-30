const Router = require('express').Router();
const BodyParser = require('body-parser');
const Initializer = require('../../helpers/initializer');
const Auth = require('../../filters/auth');
const ReponseHandler = require('../../helpers/response-handler');

let userService = Initializer.getUserService();

Router.use(BodyParser.urlencoded({ extended: true }));
Router.use(BodyParser.json());

Router.post('/register', function (request, response) {
    ReponseHandler(userService.register(request.body), response);
});

Router.post('/login', function (request, response) {
    ReponseHandler(userService.login(request.body), response);
});

Router.post('/logout', Auth, function (request, response) {
    ReponseHandler(userService.logout(request.body), response);
});

Router.delete('/delete/:id', Auth, function (request, response) {
    ReponseHandler(userService.delete(request.params.id), response);
});

Router.put('/update', Auth, function (request, response) {
    ReponseHandler(userService.update(request.body), response);
});

Router.get('/get/:id', Auth, function (request, response) {
    ReponseHandler(userService.get(request.params.id), response);
});

Router.get('/getall', Auth, function (_, response) {
    ReponseHandler(userService.getAll(), response);
});

module.exports = Router;