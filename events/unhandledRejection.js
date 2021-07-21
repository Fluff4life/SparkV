const logger = require("../../modules/logger")

exports.run = async (err, promise) => {
    await logger(`ERROR => Unhandled rejection error. ${err.stack}.`, "error")
}
