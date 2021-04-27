const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("bot")
})

Router.get("/commands", async (request, response) => {
    response.render("botcmds")
})

Router.get("/faq", async (request, response) => {
    response.render("faq")
})

module.exports = Router
