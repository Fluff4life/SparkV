const noblox = require("noblox.js")

module.exports = async (Bot) => {
    const CurrentUser = await noblox.setCookie(process.env.RobloxCookie)

    console.log(`🤖 | Logged into Roblox as ${CurrentUser.UserName} (${CurrentUser.UserID})`)
}
