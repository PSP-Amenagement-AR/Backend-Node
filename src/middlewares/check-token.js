const ErrorHandler = require('../utils/errorHandler');
const { UNAUTHORIZED } = require('../messages');

module.exports = (req, res, next) => {
  if (!req.logged) {
    next(new ErrorHandler(401, UNAUTHORIZED));
  }
  next();
};
