const logger = require("../../modules/logger")

exports.run = async (code) => {
    await logger(`EXIT => Process exited with code ${code}.`, "error")
}
