const ErrorFilter = require('../../filters/error-filter');

module.exports = function (action, response) {
    action
        .then(res => {
            if(!res) response.status(204).send(res);
            response.status(200).send(res);
        })
        .catch(er => {
            ErrorFilter.generateError(response, er).send(er);
        });
}