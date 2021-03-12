const Express = require("express")
const Topgg = require("@top-gg/sdk")

module.exports = async (Bot) => {
    const API = new Topgg.Api(process.env.dblkey)

    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()

        API.postStats({
            serverCount: ServerCount,
            shardId: Bot.shard.ids[0],
            shardCount: Bot.options.shardCount
        })
    }, 300 * 1000)
}