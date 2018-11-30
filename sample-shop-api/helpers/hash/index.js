const Bcrypt = require('bcrypt');
const SALT = 10;

module.exports = class Hash{
    static hashPassword(password){
        return Bcrypt.hashSync(password, SALT); 
    }

    static comparePassowrds(password, hashedPassword){
        return Bcrypt.compareSync(password, hashedPassword);
    }
}