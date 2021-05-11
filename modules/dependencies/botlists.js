const TopggAPI = require("dblapi.js")
const botlistspaceapi = require("botlist.space")

module.exports = async (Bot) => {
    const topgg = new TopggAPI(process.env.dblkey, Bot)
    const botlistspace = new botlistspaceapi.Client({
        id: "763126208149585961",
        botToken: process.env.BotListToken
    });
   
    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()

        try {
            topgg.postStats(ServerCount) // Other options: `shardId: Bot.shard.ids[0], shardCount: Bot.options.shardCount`
        } catch(err) {
            console.log("Failed to publish stats to top.gg!", err)
        }

        try {
            botlistspace.postServerCount(ServerCount) // Switch to a table of shards with members if shards are used.
        } catch(err) {
            console.log("Failed to publish stats to botlist.space!", err)
        }
    }, 600 * 1000)
}
