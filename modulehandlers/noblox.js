const noblox = require("noblox.js")

module.exports = async (Bot) => {
    async function RefreshCookie(){
        const NewCookie = await noblox.refreshCookie()

        Bot.Database.set("BotConfig.RobloxCookie", NewCookie)
    }

    const CurrentCookie = await Bot.Database.get("BotConfig.RobloxCookie")
    await noblox.setCookie(CurrentCookie).then(() => {
        setInterval(RefreshCookie, 300 * 1000)
    })
}