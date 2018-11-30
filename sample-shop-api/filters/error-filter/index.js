const ErrorHelper = require('../../helpers/error-helpers');

module.exports = class ErrorFilter{
    static generateError(response, mes){
        switch(mes){
            case ErrorHelper.argumentsException: response.status(400); break;
            case ErrorHelper.nonAuthorizedException: response.status(401); break;
            case ErrorHelper.accessForbiddenException: response.status(403); break;
            case ErrorHelper.notFoundException: response.status(404); break;
            case ErrorHelper.notValidModelException: response.status(422); break;
            default: response.status(400); break;
        }
        return response;
    }
}