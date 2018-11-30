const jwt = require('jsonwebtoken');
const PRIVATE_KEY = "asdfl qwefasdfasdlfqwemfasd,fansdmawnsdflkj_21231 2pfaf@12312312 2q34r sdfasdfdSFASDFDFSASDFQAA";

module.exports = class Jwt {
    static generateToken(user) {
        return jwt.sign(
            { data: user },
            PRIVATE_KEY,
            { expiresIn: '4w' });
    }

    static verifyToken(token) {
        return jwt.verify(token, PRIVATE_KEY);
    }
}
