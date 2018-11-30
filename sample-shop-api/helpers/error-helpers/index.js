module.exports = class ErrorHelper {
    static get argumentsException() {
        return "Arguments are not valid. ";
    }

    static get notValidModelException() {
        return "Model not valid. "
    }

    static get serverException() {
        return "Server exception. ";
    }

    static get accessForbiddenException() {
        return "You have no access. ";
    }

    static get nonAuthorizedException() {
        return "Need to be authorized. ";
    }

    static get notFoundException() {
        return "Not found";
    }
}