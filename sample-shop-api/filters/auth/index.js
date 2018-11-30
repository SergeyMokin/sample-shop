const ErrorHelper = require('../../helpers/error-helpers');
const Jwt = require('../../helpers/jwt');
const User = require('../../mongo/models/user');

module.exports = function (req, res, next) {
    let token = req.headers['authorization'];

    if (!token)
        return res.status(401).send({ user: null, message: ErrorHelper.nonAuthorizedException });

    token = token.replace(/[B,b]earer /g, '');

    let parsed = Jwt.verifyToken(token);

    if (!parsed.data.email)
        return res.status(401).send({ user: null, message: ErrorHelper.nonAuthorizedException });

    if (User.findOne({ email: parsed.data.email }))
        next();
    else
        return res.status(401).send({ user: null, message: ErrorHelper.nonAuthorizedException });
}