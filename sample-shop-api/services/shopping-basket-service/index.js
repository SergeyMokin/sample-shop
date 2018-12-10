const ErrorHelper = require('../../helpers/error-helpers');
const ModelNames = require('../../mongo/model-names');
const Validator = require('../../helpers/validator');

module.exports = class ShoppingBasketService {
    constructor(rep) {
        this.rep = rep;
    }

    async get(userId) {
        let userBasket = await this.rep.readByField({ userId: userId });
        if (!userBasket) userBasket = await this.rep.create({ userId: userId, purchases: [] });
        return userBasket;
    }

    async add(userId, purchases) {
        for (let purchase of purchases) {
            if (!Validator.isValid(purchase, ModelNames.PURCHASE)) throw ErrorHelper.notValidModelException;
        }

        let userBasket = await this.get(userId);

        userBasket.purchases = [...userBasket.purchases, ...purchases];

        return this.rep.update(userBasket);
    }

    async delete(userId, purchaseId) {
        let userBasket = await this.get(userId);
        userBasket.purchases.splice(userBasket.purchases.indexOf(userBasket.purchases.find(x => x._id == purchaseId)), 1);

        return this.rep.update(userBasket);
    }

    async clear(userId) {
        let userBasket = await this.get(userId);

        userBasket.purchases = [];

        return this.rep.update(userBasket);
    }
}