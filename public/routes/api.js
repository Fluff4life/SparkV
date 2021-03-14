const Express = require("express")
const Topgg = require("@top-gg/sdk")

const Router = Express.Router()
const Dirname = require("../GetDirname")
const Webhook = new Topgg.Webhook("Ch1llBloxTopAuth0808")

Router.get("/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/ch1llblox/status", async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.post("/ch1llblox/uservote", Webhook.middleware(), async (request, response) => {
    const User = global.Bot.users.fetch(request.vote.user)

    if (User){
        try {
            var Multiplier = await global.Bot.Database.get(`UserData_${request.vote.user}.multiplier`)
  
            if (!Multiplier) {
                Multiplier = 1
            }
    
            await global.Bot.Database.add(`UserData_${request.vote.user}.ch1llbucks`, 1000 * Multiplier)
    
            User.send(`Thanks for voting!\nYou just earned yourself \`❄${await global.Bot.FormatNumber(1000 * Multiplier)}\` coins for voting on top.gg.`)
            console.log(`User voted! Username: ${User} ID: ${request.vote.user}.`)
    
            return response.status(200).send({ status: 200, message: "OK" })
        } catch(err) {
            
        }
    }
})

module.exports = Router
