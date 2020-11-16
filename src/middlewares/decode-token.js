const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const { secretKey } = require('../../config');

module.exports = (req, res, next) => {
  jwt.verify(req.get('Authorization'), secretKey, (err, decoded) => {
    if (err) {
      req.logged = false;
      return next()
    }
    req.userInfos = decoded;
    req.logged = true;
    userModel.findById(req.userInfos.id, (err, res) => {
      req.userInfos.admin = !err && res !== null && res.admin;
      next();
    });
  });

};
