const fileModel = require('../models/file');
const ErrorHandler = require('../utils/errorHandler');
const { MISSING_FILE, SERVER_ERROR } = require('../messages');
const { baseFilePath } = require('../../config');

module.exports = {

  create(req, res, next) {
    const uid = req.userInfos.id;
    const paths = [];

    if (!req.files) {
      return next(new ErrorHandler(400, MISSING_FILE));
    }
    Object.keys(req.files).forEach(key => {
      const file = req.files[key];
      paths.push(`/${uid}/${file.name}`);
      file.mv(`${baseFilePath}/${uid}/${file.name}`);
    });
    fileModel.create(paths.map(path => ({ path, uid })), (err, docs) => {
      console.log(err);
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json({
        files: paths,
      });
    })
  }
};
