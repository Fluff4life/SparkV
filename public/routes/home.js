const Express = require("express")

const Dirname = require("../GetDirname")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.sendFile(Dirname() + "/html/home.html");
})

module.exports = Router
