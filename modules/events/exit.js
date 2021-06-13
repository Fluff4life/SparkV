exports.run = async (code) => {
    await SentryLog("Fatal", code)
    
    console.log(require("chalk").red(`EXIT => Process exited with code ${code}.`))
}
