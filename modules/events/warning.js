exports.run = async (warning) => {
    await SentryLog("Warning", warning)
    
    console.log(require("chalk").yellow(`WARNING => ${warning.name} => ${warning.message}.`))
}
