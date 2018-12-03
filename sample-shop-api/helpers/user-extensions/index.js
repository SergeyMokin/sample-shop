const Jwt = require('../../helpers/jwt');

module.exports = class UserExtensions {
    static getUserId(req) {
        return Jwt.verifyToken(req.headers['authorization'].replace(/[B,b]earer /g, '')).data._id;
    }
}