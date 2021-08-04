const logger = require("../modules/logger");

exports.run = async (err, promise) => {
  await logger(`Unhandled rejection error. ${err.stack}.`, "error");
};
