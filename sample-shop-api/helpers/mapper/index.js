const ModelNames = require('../../mongo/model-names');

function userMap(user) {
    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        pictureRef: user.pictureRef
    };
}

module.exports = class Mapper {
    static map(obj, name) {
        if (!obj || !name) throw ErrorHelper.notValidModelException;
        switch (name) {
            case ModelNames.USER: return userMap(obj);
            default: throw ErrorHelper.argumentsException;
        }
    }
}