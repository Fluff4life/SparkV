const noblox = require("noblox.js")

module.exports = async (Bot) => {
    const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
    
    await noblox.setCookie(CurrentCookie).then(async () => {
        setInterval(() => {
            const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
            const NewCookie = await noblox.refreshCookie(CurrentCookie)
    
            Bot.Database.set("BotConfig.RobloxCookie", NewCookie)
        }, 60 * 1000)
    })
}