const Express = require("express")
const Router = Express.Router()

const CheckAuth = require("../auth/CheckAuth")

Router.get("/", async (request, response) => {
    response.redirect("/selector")
})

Router.get("/status", async (request, response) => {
    response.redirect("https://stats.uptimerobot.com/x84NBTJEkN")
})

Router.get("/status", async (request, response) => {
    response.render("500")
})

Router.get("/selector", CheckAuth, async (request, response) => {
    response.render("selector", {
        user: request.userinfo,
        currentURL: `${global.Bot.Config.website.baseURL}/${request.originalUrl}`
    })
})

module.exports = Router
