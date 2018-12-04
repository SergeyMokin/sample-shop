const ErrorHelper = require('../../helpers/error-helpers');
const Validator = require('../../helpers/validator');
const ModelNames = require('../../mongo/model-names');
const Jwt = require('../../helpers/jwt');
const Hash = require('../../helpers/hash');
const Mapper = require('../../helpers/mapper');
const Roles = require('../../mongo/models/roles');

module.exports = class UserService {
    constructor(rep) {
        this.repository = rep;
    }

    async register(user) {
        if (!Validator.isValid(user, ModelNames.USER)) throw ErrorHelper.notValidModelException;

        user.password = Hash.hashPassword(user.password);

        user.email = user.email.trim();

        let userExists = await this.repository.readByField({ email: user.email });

        if (userExists) throw ErrorHelper.argumentsException;

        user.role = Roles.USER;

        let registeredUser = await this.repository.create(user);

        if (!registeredUser) throw ErrorHelper.argumentsException;

        return {
            user: Mapper.map(registeredUser, ModelNames.USER, ModelNames.USER_VIEW),
            token: `bearer ${Jwt.generateToken(registeredUser)}`
        };
    }

    async login(creds) {
        if (!Validator.isValid(creds, ModelNames.CREDS)) throw ErrorHelper.notValidModelException;

        creds.email = creds.email.trim();

        let user = await this.repository.readByField({ email: creds.email });

        if (!user) throw ErrorHelper.argumentsException;

        if (Hash.comparePassowrds(creds.password, user.password)) {
            return {
                user: Mapper.map(user, ModelNames.USER, ModelNames.USER_VIEW),
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
        return await this.repository.delete(id);
    }

    async update(user) {
        if (!Validator.isValid(user, ModelNames.USER_VIEW)) throw ErrorHelper.notValidModelException;

        let currentUser = await this.repository.read(user._id);

        if (!currentUser) throw ErrorHelper.notFoundException;

        if (user.password) {
            if (!Hash.comparePassowrds(user.password, currentUser.password)) {
                user.password = Hash.hashPassword(user.password);
            }
        }
        else {
            user.password = currentUser.password;
        }

        return await this.repository.update(user);
    }

    async get(id) {
        let user = await this.repository.read(id);
        return user ? Mapper.map(user, ModelNames.USER, ModelNames.USER_VIEW) : user;
    }

    async getAll() {
        return (await this.repository.readAll()).map(user => {
            return Mapper.map(user, ModelNames.USER, ModelNames.USER_VIEW);
        });
    }
}