const ModelNames = require('../../mongo/model-names');

function userMap(user, nameTo) {
    switch (nameTo) {
        case ModelNames.USER_VIEW: return {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            pictureRef: user.pictureRef,
            role: user.role
        };
        default: return user;
    }

}

module.exports = class Mapper {
    static map(obj, nameFrom, nameTo) {
        if (!obj || !nameFrom || !nameTo) throw ErrorHelper.notValidModelException;
        switch (nameFrom) {
            case ModelNames.USER: return userMap(obj, nameTo);
            default: throw ErrorHelper.argumentsException;
        }
    }
}