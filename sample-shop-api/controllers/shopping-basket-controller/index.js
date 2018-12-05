const router = require('express').Router();
const bodyParser = require('body-parser');
const Initializer = require('../../helpers/initializer');
const Auth = require('../../filters/auth');
const ReponseHandler = require('../../helpers/response-handler');
const UserExtensions = require('../../helpers/user-extensions');

let shoppingBasketService = Initializer.getShoppingBasketService();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', Auth, function (request, response) {
    ReponseHandler(shoppingBasketService.get(UserExtensions.getUserId(request)), response);
});

router.post('/', Auth, function (request, response) {
    ReponseHandler(shoppingBasketService.add(UserExtensions.getUserId(request), request.body), response);
});

router.delete('/:id', Auth, function (request, response) {
    ReponseHandler(shoppingBasketService.delete(UserExtensions.getUserId(request), request.params.id), response);
});

router.post('/clear', Auth, function (request, response) {
    ReponseHandler(shoppingBasketService.clear(UserExtensions.getUserId(request)), response);
});


module.exports = router;