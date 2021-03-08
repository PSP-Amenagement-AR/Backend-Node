const config = {};

config.secretKey = process.env.SECRETKEY || "ProductionSecretKey";
config.mongodb = process.env.MONGODB || "mongodb+srv://BoboLapin:BoboLapin@aramenagementcluster.nh7o8.mongodb.net/data?retryWrites=true&w=majority";
config.saltValue = process.env.SALTVALUE || 10;
config.port = process.env.PORT || 3000;
config.baseFilePath = process.env.BASE_FILE_PATH || "./files";
config.defaultAdmin = {
  email: 'admin@admin.com',
  password: 'admin',
  admin: true
};

module.exports = config;
