const Express = require("express")
const Topgg = require("@top-gg/sdk")

const Router = Express.Router()
const Dirname = require("../GetDirname")
const Webhook = new Topgg.Webhook("Ch1llBloxTopAuth0808")

Router.get("/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/ch1llblox/status", async (request, response) => {
    response.status(process.env.BotOnline).send({ status: process.env.BotOnline });
})

Router.post("/ch1llblox/uservote", Webhook.middleware(), (request, response) => {
    try {
        const Bot = global.Bot
        const User = Bot.users.cache.fetch(request.vote.user);

        var Ch1llBucks = await Bot.Database.get(`UserData_${request.vote.user}.ch1llbucks`)
        var Multiplier = await Bot.Database.get(`UserData_${request.vote.user}.multiplier`)

        if (!Multiplier) {
            Multiplier = 1
        }

        if (!Ch1llBucks) {
            Ch1llBucks = 0
        }

        await Bot.Database.set(`UserData_${request.vote.user}.ch1llbucks`, Ch1llBucks + 1000 * Multiplier)

        User.send(`You've just earned ❄${await Bot.FormatNumber(1000 * Multiplier)} Ch1llBucks for voting. Enjoy!`)
        console.log(`User voted! ID: ${request.vote.user}.`)

        return response.status(200).send({ status: 200, message: "OK" })
    } catch {
        return response.status(500).send({ status: 500, message: "Bad Request" })
    }
})

Router.use((req, res, next) => {
    res.status(404).sendFile(Dirname() + "/html/404.html");
});

module.exports = Router
