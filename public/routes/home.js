const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("home/home");
})

module.exports = Router
