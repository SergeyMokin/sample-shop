const bcrypt = require('bcrypt');
const SALT = 10;

module.exports = class Hash {
    static hashPassword(password) {
        return bcrypt.hashSync(password, SALT);
    }

    static comparePassowrds(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}