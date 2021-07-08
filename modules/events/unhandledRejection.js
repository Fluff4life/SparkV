const SentryLog = require("../../modules/Log")

exports.run = async (err, promise) => {
    await SentryLog("Error", err)

    console.log(require("chalk").red(`ERROR => Unhandled rejection error. ${err.stack}.`))
}
