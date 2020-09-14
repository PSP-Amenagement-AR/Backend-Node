const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  jwt.verify(req.get('Authorization'), 'youraccesstokensecret', (err, decoded) => {
    req.userInfos = decoded;
    next();
  });
};
