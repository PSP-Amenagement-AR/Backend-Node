const nodeEnv = process.env.NODE_ENV || "dev";

module.exports = { nodeEnv, ...require(`./environments/${nodeEnv}`) };
