let Initializer = require('../initializer');
let Hash = require('../hash');
let Roles = require('../../mongo/models/roles');

module.exports = async function () {
    let any = function (arr, predicate) {
        for (let el of arr) {
            if (predicate(el)) {
                return true;
            }
        }
        return false;
    }

    let rep = Initializer.getUserRepository();

    let users = await rep.readAll();

    if (!any(users, (x) => x.role === Roles.ADMIN)) {
        rep.create({
            email: 'admin',
            password: Hash.hashPassword('admin'),
            firstName: 'admin',
            lastName: 'admin',
            pictureRef: 'https://telegram.org/file/811140509/b45/dQTLEwKZ9gs.22232.gif/4580677d940852f30e',
            role: Roles.ADMIN
        });
    }
}