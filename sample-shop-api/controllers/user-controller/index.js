const router = require('express').Router();
const bodyParser = require('body-parser');
const Initializer = require('../../helpers/initializer');
const Auth = require('../../filters/auth');
const ReponseHandler = require('../../helpers/response-handler');

let userService = Initializer.getUserService();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', function (request, response) {
    ReponseHandler(userService.register(request.body), response);
});

router.post('/login', function (request, response) {
    ReponseHandler(userService.login(request.body), response);
});

router.post('/logout', Auth, function (request, response) {
    ReponseHandler(userService.logout(request.body), response);
});

router.delete('/delete/:id', Auth, function (request, response) {
    ReponseHandler(userService.delete(request.params.id), response);
});

router.put('/update', Auth, function (request, response) {
    ReponseHandler(userService.update(request.body), response);
});

router.get('/get/:id', Auth, function (request, response) {
    ReponseHandler(userService.get(request.params.id), response);
});

router.get('/getall', Auth, function (_, response) {
    ReponseHandler(userService.getAll(), response);
});

module.exports = router;