const jwt = require('jsonwebtoken');
const config = require('./../../config');

function createToken(user)
{
    return jwt.sign({ email: user.email,  id: user._id }, config.secretKey);
}

module.exports = createToken;
