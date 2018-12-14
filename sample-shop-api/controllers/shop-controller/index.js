const router = require('express').Router();
const Initializer = require('../../helpers/initializer');
const Auth = require('../../filters/auth');
const ReponseHandler = require('../../helpers/response-handler');
const UserExtensions = require('../../helpers/user-extensions');

let shopService = Initializer.getShopService();

router.post('/buy', Auth, function (request, response) {
    ReponseHandler(shopService.buy(UserExtensions.getUserId(request)), response);
});


module.exports = router;