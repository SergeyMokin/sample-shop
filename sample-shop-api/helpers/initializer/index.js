const Repository = require('../../mongo/repository');
const UserService = require('../../services/user-service');
const User = require('../../mongo/models/user');

module.exports = class Initializer {
    static getUserRepository(){
        return new Repository(User);
    }

    static getUserService() {
        return new UserService(Initializer.getUserRepository());
    }
}