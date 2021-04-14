const noblox = require("noblox.js")

module.exports = async (Bot) => {
    async function RefreshCookie(){
        const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
        const NewCookie = await noblox.refreshCookie(CurrentCookie)

        Bot.Database.set("BotConfig.RobloxCookie", NewCookie)
    }

    const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
    
    await noblox.setCookie(CurrentCookie).then(() => {
        setInterval(RefreshCookie(), 60 * 1000)
    })
}