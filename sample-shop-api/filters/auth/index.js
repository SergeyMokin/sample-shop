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

    User.findOne({ email: parsed.data.email })
        .then((user) => {
            if (user) {
                if (user._id == parsed.data._id
                    && user.password == parsed.data.password) {
                    next();
                    return;
                }
            }
            res.status(401).send({ user: null, message: ErrorHelper.nonAuthorizedException });
        })
        .catch(() => res.status(401).send({ user: null, message: ErrorHelper.nonAuthorizedException }));
}