const Express = require("express")

const Dirname = require("../GetDirname")

const Router = Express.Router()

console.log(Dirname())

Router.get("/", async (request, response) => {
    response.sendFile(Dirname() + "/html/ch1llblox.html")
})

Router.get("/faq", async (request, response) => {
    response.sendFile(Dirname() + "/html/ch1llbloxfaq.html")
})

module.exports = Router
