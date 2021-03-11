const noblox = require("noblox.js")

module.exports = async (Bot) => {
    async function RefreshCookie(CurrentCookie){
        const NewCookie = await noblox.refreshCookie(CurrentCookie)

        Bot.Database.set("BotConfig.RobloxCookie", NewCookie)
    }

    const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
    
    await noblox.setCookie(CurrentCookie).then(() => {
        setInterval(RefreshCookie(await Bot.Database.get("BotConfig.RobloxCookie")), 300 * 1000)
    })
}