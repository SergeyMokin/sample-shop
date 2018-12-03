const Repository = require('../../mongo/repository');
const UserService = require('../../services/user-service');
const PurchaseService = require('../../services/purchase-service');
const User = require('../../mongo/models/user');
const Purchase = require('../../mongo/models/purchase');

module.exports = class Initializer {
    static getUserRepository() {
        return new Repository(User);
    }

    static getPurchaseRepository() {
        return new Repository(Purchase);
    }

    static getUserService() {
        return new UserService(Initializer.getUserRepository());
    }

    static getPurchaseService() {
        return new PurchaseService(Initializer.getPurchaseRepository());
    }
}