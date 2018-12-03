const ErrorHelper = require('../../helpers/error-helpers');
const Validator = require('../../helpers/validator');
const ModelNames = require('../../mongo/model-names');

module.exports = class PurchaseService {
    constructor(rep) {
        this.rep = rep;
    }

    async get(id) {
        return await this.rep.read(id);
    }

    async getAll() {
        return await this.rep.readAll();
    }

    async create(model) {
        if (!Validator.isValid(model, ModelNames.PURCHASE)) throw ErrorHelper.notValidModelException;

        return await this.rep.create(model);
    }

    async update(model) {
        if (!Validator.isValid(model, ModelNames.PURCHASE)) throw ErrorHelper.notValidModelException;

        return await this.rep.update(model._id, model);
    }

    async delete(id) {
        return await this.rep.delete(id);
    }
}