const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("ch1llstudios/cshome");
})

module.exports = Router
