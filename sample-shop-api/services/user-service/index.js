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

    async update(user, reqUserId) {
        if (!Validator.isValid(user, ModelNames.USER_VIEW)) throw ErrorHelper.notValidModelException;

        let currentUser = await this.repository.read(user._id);

        if (!currentUser) throw ErrorHelper.notFoundException;

        if(currentUser.role !== user.role){
            let reqUser = await this.repository.read(reqUserId);
            if(!reqUser) throw ErrorHelper.accessForbiddenException;
            if(reqUser.role !== Roles.ADMIN || currentUser._id == reqUserId) throw ErrorHelper.accessForbiddenException;
            currentUser.role = user.role;
        }

        if (user.password) {
            currentUser.password = Hash.hashPassword(user.password);
        }
        
        currentUser.firstName = user.firstName;
        currentUser.lastName = user.lastName;
        currentUser.email = user.email;
        currentUser.pictureRef = user.pictureRef;

        let result = await this.repository.update(currentUser);

        return {
            user: Mapper.map(result, ModelNames.USER, ModelNames.USER_VIEW),
            token: `bearer ${Jwt.generateToken(result)}`
        };
    }

    async get(id) {
        let user = await this.repository.read(id);
        return user ? Mapper.map(user, ModelNames.USER, ModelNames.USER_VIEW) : user;
    }

    async getAll(reqUserId) {
        return (await this.repository.readAll()).filter(u => u._id != reqUserId).map(user => {
            return Mapper.map(user, ModelNames.USER, ModelNames.USER_VIEW);
        });
    }
}