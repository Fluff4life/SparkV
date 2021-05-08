const Express = require("express")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/status", async (request, response) => {
    response.redirect("https://stats.uptimerobot.com/x84NBTJEkN")
})

/* Fix for wrong redirects */
Router.get("/dashboard", async (request, response) => {
    response.redirect("/bot/dashboard")
})

module.exports = Router