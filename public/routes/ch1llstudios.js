const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.sendFile(Dirname() + "/html/cshome.html");
})

Router.get("/", async (request, response) => {
    response.status(500)
    // response.sendFile(Dirname() + "/html/cshome.html");
})

module.exports = Router
