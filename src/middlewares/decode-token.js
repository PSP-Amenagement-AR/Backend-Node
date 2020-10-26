const jwt = require('jsonwebtoken');

const { secretKey } = require('../../config');

module.exports = (req, res, next) => {
  jwt.verify(req.get('Authorization'), secretKey, (err, decoded) => {
    if (err) {
      req.logged = false;
    } else {
      req.userInfos = decoded;
      req.logged = true;
    }
    next();
  });
};
