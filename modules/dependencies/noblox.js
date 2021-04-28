const noblox = require("noblox.js")

module.exports = async (Bot) => {
    if (process.env.alpha === "true"){
        return
    }
    
    const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
    
    await noblox.setCookie(CurrentCookie).then(async () => {
        setInterval(async () => {
            const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
            const NewCookie = await noblox.refreshCookie(CurrentCookie)
    
            Bot.Database.set("BotConfig.RobloxCookie", NewCookie)
        }, 60 * 1000)
    })
}