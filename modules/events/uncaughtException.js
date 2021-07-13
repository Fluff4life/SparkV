const logger = require("../../modules/logger")

exports.run = async (err, promise) => {
    const ErrorMessage = err.stack.toString().replaceAll(new RegExp(`${__dirname}/`, "g"), "./")

    await logger(`ERROR => Unhandled exception error. ${ErrorMessage}.`, "error")
    process.exit(1)
}
