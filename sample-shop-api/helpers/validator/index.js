const ErrorHelper = require('../error-helpers');
const ModelNames = require('../../mongo/model-names');

//TODO: realize validators

function checkCreds(creds) {
    return creds.email && creds.password;
}

function checkUser(user) {
    return user.email
        && user.password
        && user.firstName
        && user.lastName
        && user.pictureRef;
}

function checkUserView(user) {
    return user.email
        && user.firstName
        && user.lastName
        && user.pictureRef;
}

module.exports = class Validator {
    static isValid(obj, name) {
        if (!obj || !name) throw ErrorHelper.notValidModelException;
        switch (name) {
            case ModelNames.CREDS: return checkCreds(obj);
            case ModelNames.USER: return checkUser(obj);
            case ModelNames.USER_VIEW: return checkUserView(obj);
            default: throw ErrorHelper.argumentsException;
        }
    }
}