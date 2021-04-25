const TopggAPI = require("dblapi.js")
const botlistspaceapi = require("botlist.space")
const Express = require("express")

module.exports = async (Bot) => {
    const topgg = new TopggAPI(process.env.dblkey, Bot)
    const botlistspace = new botlistspaceapi.Client({
        id: Bot.Config.Bot.ClientID,
        botToken: process.env.BotListToken
    });
   
    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()

        topgg.postStats(ServerCount) // Other options: `shardId: Bot.shard.ids[0], shardCount: Bot.options.shardCount`
        botlistspace.postServerCount(ServerCount) // Switch to a table of shards with members if shards are used.
    }, 2000 * 1000)
}