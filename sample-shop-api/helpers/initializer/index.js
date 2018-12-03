const Repository = require('../../mongo/repository');
const UserService = require('../../services/user-service');
const PurchaseService = require('../../services/purchase-service');
const ShoppingBasketService = require('../../services/shopping-basket-service');
const EmailService = require('../../services/email-service');
const ShopService = require('../../services/shop-service');
const User = require('../../mongo/models/user');
const Purchase = require('../../mongo/models/purchase');
const ShoppengBasket = require('../../mongo/models/shopping-basket');

module.exports = class Initializer {
    static getUserRepository() {
        return new Repository(User);
    }

    static getPurchaseRepository() {
        return new Repository(Purchase);
    }

    static getShoppingBasketRepository() {
        return new Repository(ShoppengBasket);
    }

    static getUserService() {
        return new UserService(Initializer.getUserRepository());
    }

    static getPurchaseService() {
        return new PurchaseService(Initializer.getPurchaseRepository());
    }

    static getShoppingBasketService() {
        return new ShoppingBasketService(Initializer.getShoppingBasketRepository());
    }

    static getEmailService() {
        return new EmailService();
    }

    static getShopService() {
        return new ShopService(Initializer.getEmailService(), Initializer.getShoppingBasketService(), Initializer.getUserService());
    }
}