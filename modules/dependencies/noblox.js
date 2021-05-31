const noblox = require("noblox.js")

module.exports = async (Bot) => {
    await noblox.setCookie(process.env.RobloxCookie)
}
