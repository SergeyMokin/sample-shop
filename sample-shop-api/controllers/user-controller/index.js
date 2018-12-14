const router = require('express').Router();
const Initializer = require('../../helpers/initializer');
const Auth = require('../../filters/auth');
const AdminAuth = require('../../filters/admin-auth');
const ReponseHandler = require('../../helpers/response-handler');
const UserExtensions = require('../../helpers/user-extensions');

let userService = Initializer.getUserService();

router.post('/register', function (request, response) {
    ReponseHandler(userService.register(request.body), response);
});

router.post('/login', function (request, response) {
    ReponseHandler(userService.login(request.body), response);
});

router.post('/logout', Auth, function (request, response) {
    ReponseHandler(userService.logout(request.body), response);
});

router.delete('/delete/:id', AdminAuth, function (request, response) {
    ReponseHandler(userService.delete(request.params.id), response);
});

router.put('/update', Auth, function (request, response) {
    ReponseHandler(userService.update(request.body, UserExtensions.getUserId(request)), response);
});

router.get('/get/:id', Auth, function (request, response) {
    ReponseHandler(userService.get(request.params.id), response);
});

router.get('/getall', Auth, function (request, response) {
    ReponseHandler(userService.getAll(UserExtensions.getUserId(request)), response);
});

module.exports = router;