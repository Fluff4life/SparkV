const Express = require("express")
const Topgg = require("@top-gg/sdk")

module.exports = async (Bot) => {
    const API = new Topgg.Api(process.env.dblkey)

    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()
        if (Bot.Config.ShardingEnabled === true){
            API.postStats({
                serverCount: ServerCount,
                shardId: Bot.shard.ids[0],
                shardCount: Bot.options.shardCount
            })
        } else {
            API.postStats({
                serverCount: ServerCount
            })
        }
    }, 300 * 1000)
}