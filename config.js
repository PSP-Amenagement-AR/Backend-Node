const config = {};

config.secretKey = process.env.SECRETKEY || "defaultSecretKey";
config.mongodb = process.env.MONGODB || "mongodb://localhost:27017/ARAmenagement";
config.nodeEnv = process.env.NODE_ENV || "dev";
config.saltValue = process.env.SALTVALUE || 10;
config.port = process.env.PORT || 3000;
config.baseFilePath = process.env.BASE_FILE_PATH || "./files";

module.exports = config;
