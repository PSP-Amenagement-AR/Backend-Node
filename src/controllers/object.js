const objectModel = require('../models/object');
const ErrorHandler = require('../utils/errorHandler');
const { SERVER_ERROR } = require('../messages');


module.exports = {

  create(req, res, next) {
    objectModel.create({ ...req.body, uid: req.userInfos.id },  (err, result) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json(result);
    });
  },

  delete(req, res, next) {
    const id = req.params.id;

    objectModel.findByIdAndDelete(id, err => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(204).json();
    })
  },

  get(req, res, next) {
    objectModel.find({ uid: req.userInfos.id }, (err, docs) => {
      if (err) {
        return next(new ErrorHandler(500, SERVER_ERROR));
      }
      res.status(200).json(docs);
    });
  }

};
