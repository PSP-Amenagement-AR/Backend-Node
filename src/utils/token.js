const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

function createToken(user)
{
    return jwt.sign({ email: user.email,  id: user.id }, accessTokenSecret);
}

module.exports = createToken;
