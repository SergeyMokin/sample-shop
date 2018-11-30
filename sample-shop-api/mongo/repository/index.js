module.exports = class Repository {
    constructor(model) {
        this.model = model;
    }

    async create(obj) {
        return await this.model.create(obj);
    }

    async read(id) {
        return await this.model.findById(id);
    }

    async update(obj) {
        return await this.model.findByIdAndUpdate(obj._id, obj);
    }

    async delete(id) {
        return await this.model.findByIdAndRemove(id)
    }

    async readAll() {
        return await this.model.find();
    }

    async readByField(field) {
        return await this.model.findOne(field);
    }
}