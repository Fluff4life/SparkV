const noblox = require("noblox.js");

module.exports = async (bot) => {
    const CurrentUser = await noblox.setCookie(process.env.ROBLOXCOOKIE);

    console.log(
        `🤖 | Logged into Roblox as ${CurrentUser.UserName} (${CurrentUser.UserID})`
    );
};
