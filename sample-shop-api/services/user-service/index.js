const errorHelper = require('../../helpers/error-helpers');
const validator = require('../../helpers/validator');
const modelNames = require('../../mongo/model-names');
const jwt = require('../../helpers/jwt');
const hash = require('../../helpers/hash');
const mapper = require('../../helpers/mapper');

module.exports = class UserService {
    constructor(rep) {
        this.repository = rep;
    }

    async register(user) {
        if (!validator.isValid(user, modelNames.USER)) throw errorHelper.notValidModelException;

        user.password = hash.hashPassword(user.password);

        let userExists = await this.repository.readByField({ email: user.email });

        if (userExists) throw errorHelper.argumentsException;

        let registeredUser = await this.repository.create(user);

        if (!registeredUser) throw errorHelper.argumentsException;

        return {
            user: mapper.map(registeredUser, modelNames.USER, modelNames.USER_VIEW),
            token: `bearer ${jwt.generateToken(registeredUser)}`
        };
    }

    async login(creds) {
        if (!validator.isValid(creds, modelNames.CREDS)) throw errorHelper.notValidModelException;

        let user = await this.repository.readByField({ email: creds.email });

        if (!user) throw errorHelper.argumentsException;

        if (hash.comparePassowrds(creds.password, user.password)) {
            return {
                user: mapper.map(user, modelNames.USER, modelNames.USER_VIEW),
                token: `bearer ${jwt.generateToken(user)}`
            };
        }

        throw errorHelper.argumentsException;
    }

    async logout() {
        return {
            user: null,
            token: null
        };
    }

    async delete(id) {
        return await this.repository.delete(id);
    }

    async update(user) {
        if (!validator.isValid(user, modelNames.USER)) throw errorHelper.notValidModelException;

        return await this.repository.update(user);
    }

    async get(id) {
        let user = await this.repository.read(id);
        return user ? mapper.map(user, modelNames.USER, modelNames.USER_VIEW) : user;
    }

    async getAll() {
        return (await this.repository.readAll()).map(user => {
            return mapper.map(user, modelNames.USER, modelNames.USER_VIEW);
        });
    }
}