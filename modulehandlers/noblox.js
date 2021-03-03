const noblox = require("noblox.js")

module.exports = async (Bot) => {
    noblox.setCookie(process.env.RobloxBotCookie)

    Bot.Database.set("BotData.RobloxCookie")
}