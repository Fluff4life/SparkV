const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("ch1llblox/bot")
})

Router.get("/commands", async (request, response) => {
    response.render("ch1llblox/botcmds")
})

Router.get("/donate", async (request, response) => {
    response.render("ch1llblox/donate")
})

Router.get("/faq", async (request, response) => {
    response.render("ch1llblox/faq")
})

module.exports = Router
