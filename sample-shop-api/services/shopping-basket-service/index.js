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

        userBasket.purchases = purchases;

        return this.rep.update(userBasket._id, userBasket);
    }

    async delete(userId, purchaseId) {
        let userBasket = this.get(userId);

        userBasket.purchases = userBasket.purchases.filter(x => x._id != purchaseId);

        return this.rep.update(userBasket._id, userBasket);
    }

    async clear(userId) {
        let userBasket = this.get(userId);

        userBasket.purchases = [];

        return this.rep.update(userBasket._id, userBasket);
    }
}