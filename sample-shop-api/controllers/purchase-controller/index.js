const router = require('express').Router();
const Initializer = require('../../helpers/initializer');
const Auth = require('../../filters/auth');
const AdminAuth = require('../../filters/admin-auth');
const ReponseHandler = require('../../helpers/response-handler');

let purchaseService = Initializer.getPurchaseService();

router.get('/get/:id', Auth, function (request, response) {
    ReponseHandler(purchaseService.get(request.params.id), response);
});

router.get('/getall', Auth, function (_, response) {
    ReponseHandler(purchaseService.getAll(), response);
});

router.post('/add', AdminAuth, function (request, response) {
    ReponseHandler(purchaseService.create(request.body), response);
});

router.put('/update', AdminAuth, function (request, response) {
    ReponseHandler(purchaseService.update(request.body), response);
});

router.delete('/delete/:id', AdminAuth, function (request, response) {
    ReponseHandler(purchaseService.delete(request.params.id), response);
});


module.exports = router;