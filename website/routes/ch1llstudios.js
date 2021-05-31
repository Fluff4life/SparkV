const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../CheckAuth")
const Render = require("../Render")

Router.get("/", async (request, response) => {
    Render(response, request, "ch1llstudios/cshome.ejs");
})

module.exports = Router