const bcrypt = require('bcrypt');

const userModel = require('../models/user');
const { defaultAdmin, saltValue } = require('../../config');

const createFirstAdmin = () => {
  const userInfos = {...defaultAdmin};
  userModel.findOne({ Admin: true }, (err, user) => {
    if (err) {
      process.exit(1);
    }
    userInfos.password = bcrypt.hashSync(userInfos.password, saltValue);
    if (!user) {
      userModel.create(userInfos, (error) => {
        if (error) {
          process.exit(1);
        }
      });
    }
  });
};

module.exports = createFirstAdmin;
