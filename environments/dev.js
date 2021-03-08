const config = {};

config.secretKey = process.env.SECRETKEY || "defaultSecretKey";
config.mongodb = process.env.MONGODB || "mongodb://localhost:27017/ARAmenagement";
config.saltValue = process.env.SALTVALUE || 10;
config.port = process.env.PORT || 3000;
config.baseFilePath = process.env.BASE_FILE_PATH || "./files";
config.defaultAdmin = {
  email: 'admin@admin.com',
  password: 'admin',
  admin: true
};

module.exports = config;
