const nodeEnv = process.env.NODE_ENV || "production";

module.exports = { nodeEnv, ...require(`./environments/${nodeEnv}`) };
