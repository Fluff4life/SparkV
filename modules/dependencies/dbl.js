const Express = require("express")
const Topgg = require("@top-gg/sdk")

module.exports = async (Bot) => {
    const API = new Topgg.Api(process.env.dblkey)

    setInterval(() => {
        API.postStats({
            serverCount: Bot.GetServerCount(),
            shardId: Bot.shard.ids[0],
            shardCount: Bot.options.shardCount
        })
    }, 300 * 1000)

    const Router = Express.Router()
    const Webhook = new Topgg.Webhook("Ch1llBloxTopAuth0808")

    Router.post("/ch1llblox/uservote", Webhook.middleware(), (request, response) => {
        // User voted
        // Request.vote.user: Gives User ID
        console.log(`User voted! ID: ${request.vote.user}`)
    })
}