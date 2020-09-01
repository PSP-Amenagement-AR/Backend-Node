const bcrypt = require('bcrypt');
const userModel = require('../models/user');

module.exports = {

  create(req, res, next) {
    const { email, password } = req.body;

    userModel.create({ email, password: bcrypt.hashSync(password, 10) }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Server Error' });
      }
      res.status(200).json(result);
    });
  },

};
