const jwt = require('jsonwebtoken');
const config = require('./../../config');

function createToken(user)
{
    return jwt.sign({ email: user.email,  id: user.id }, config.secretKey);
}

module.exports = createToken;
