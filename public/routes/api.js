const Express = require("express")
const Topgg = require("@top-gg/sdk")

const Router = Express.Router()
const Webhook = new Topgg.Webhook("Ch1llBloxTopAuth0808")

Router.get("/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/ch1llblox/status", async (request, response) => {
    response.status(process.env.BotOnline).send({ status: process.env.BotOnline });
})

Router.post("/ch1llblox/uservote", Webhook.middleware(), (request, response) => {
    // User voted
    // Request.vote.user: Gives User ID
    console.log(`User voted! ID: ${request.vote.user}`)
})

module.exports = Router
