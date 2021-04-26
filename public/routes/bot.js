const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("bot")
})

Router.get("/faq", async (request, response) => {
    response.render("faq")
})

module.exports = Router
