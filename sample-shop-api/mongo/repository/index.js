module.exports = class Repository {
    constructor(model) {
        this.Model = model;
    }

    async create(obj) {
        return await this.Model.create(obj);
    }

    async read(id) {
        return await this.Model.findById(id);
    }

    async update(obj) {
        return await this.Model.findByIdAndUpdate(obj.id, obj);
    }

    async delete(id) {
        return await this.Model.findByIdAndRemove(id)
    }

    async readAll() {
        return await this.Model.find();
    }

    async readByField(field) {
        return await this.Model.findOne(field);
    }
}