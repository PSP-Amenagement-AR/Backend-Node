const config = {};

config.secretKey = process.env.SECRETKEY || "TestSecretKey";
config.saltValue = process.env.SALTVALUE || 10;
config.port = process.env.PORT || 3000;
config.defaultAdmin = {
  email: 'admin@admin.com',
  password: 'admin',
  admin: true
};

module.exports = config;
