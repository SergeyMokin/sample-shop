const ErrorHelper = require('../../helpers/error-helpers');
const Validator = require('../../helpers/validator');
const ModelNames = require('../../mongo/model-names');
const Jwt = require('../../helpers/jwt');
const Hash = require('../../helpers/hash');
const Mapper = require('../../helpers/mapper');

module.exports = class UserService {
    constructor(rep) {
        this.Repository = rep;
    }

    async register(user) {
        if (!Validator.isValid(user, ModelNames.USER)) throw ErrorHelper.notValidModelException;

        user.password = Hash.hashPassword(user.password);

        let userExists = await this.Repository.readByField({ email: user.email });

        if (userExists) throw ErrorHelper.argumentsException;

        let registeredUser = await this.Repository.create(user);

        if (!registeredUser) throw ErrorHelper.argumentsException;

        return {
            user: Mapper.map(registeredUser, ModelNames.USER),
            token: `bearer ${Jwt.generateToken(registeredUser)}`
        };
    }

    async login(creds) {
        if (!Validator.isValid(creds, ModelNames.CREDS)) throw ErrorHelper.notValidModelException;

        let user = await this.Repository.readByField({ email: creds.email });

        if (!user) throw ErrorHelper.argumentsException;

        if (Hash.comparePassowrds(creds.password, user.password)) {
            return {
                user: Mapper.map(user, ModelNames.USER),
                token: `bearer ${Jwt.generateToken(user)}`
            };
        }

        throw ErrorHelper.argumentsException;
    }

    async logout() {
        return {
            user: null,
            token: null
        };
    }

    async delete(id) {
        return await this.Repository.delete(id);
    }

    async update(user) {
        if (!Validator.isValid(user, ModelNames.USER)) throw ErrorHelper.notValidModelException;

        return await this.Repository.update(user);
    }

    async get(id) {
        let user = await this.Repository.read(id);
        return user ? Mapper.map(user, ModelNames.USER) : user;
    }

    async getAll() {
        return (await this.Repository.readAll()).map(user => {
            return Mapper.map(user, ModelNames.USER);
        });
    }
}