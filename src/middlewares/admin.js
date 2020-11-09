const ErrorHandler = require('../utils/errorHandler');

const { UNAUTHORIZED } = require('../messages') ;

module.exports = (req, res, next) => {
  if (req.userInfos.admin) {
    return next()
  }
  next(new ErrorHandler(401, UNAUTHORIZED));
};
