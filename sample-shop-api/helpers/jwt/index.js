const JWT = require('jsonwebtoken');
const PRIVATE_KEY = "asdfl qwefasdfasdlfqwemfasd,fansdmawnsdflkj_21231 2pfaf@12312312 2q34r sdfasdfdSFASDFDFSASDFQAA";

module.exports = class Jwt {
    static generateToken(user) {
        return JWT.sign(
            { data: user },
            PRIVATE_KEY,
            { expiresIn: '4w' });
    }

    static verifyToken(token) {
        return JWT.verify(token, PRIVATE_KEY);
    }
}
