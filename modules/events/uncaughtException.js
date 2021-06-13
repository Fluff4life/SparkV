exports.run = async (err, promise) => {
    const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")

    await SentryLog("Fatal", err)
    
    console.log(require("chalk").red(`ERROR => Uncaught Exception error. ${ErrorMessage}.`))
    process.exit(1)
}
