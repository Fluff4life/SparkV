const TopggAPI = require("dblapi.js")
const botlistspaceapi = require("botlist.space")

module.exports = async (Bot) => {
    if (process.env.alpha === "true"){
        return
    }

    const topgg = new TopggAPI(process.env.dblkey, Bot)
    const botlistspace = new botlistspaceapi.Client({
        id: Bot.Config.Bot.ClientID.toString(),
        botToken: process.env.BotListToken
    });
   
    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()

        topgg.postStats(ServerCount) // Other options: `shardId: Bot.shard.ids[0], shardCount: Bot.options.shardCount`
        botlistspace.postServerCount(ServerCount) // Switch to a table of shards with members if shards are used.
    }, 2000 * 1000)
}