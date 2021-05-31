const Topgg = require("@top-gg/sdk")
const { AutoPoster } = require("topgg-autoposter")

module.exports = async (Bot) => {
    /*
    const api = new Topgg.Api(process.env.dblkey)
   
    setInterval(async () => {
        const ServerCount = await Bot.GetServerCount()

        try {
            api.postStats({
                serverCount: ServerCount
            }) // Other options: `shardId: Bot.shard.ids[0], shardCount: Bot.options.shardCount`
        } catch(err) {
            console.log("Failed to publish stats to top.gg!", err)
        }
    }, 1800 * 1000)
    */

    const poster = AutoPoster(process.env.dblkey, Bot)

    poster.on("error", (err) => {
        console.log(`TOP.GG POSTING ERROR! => ${err}`)
    })
}
