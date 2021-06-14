const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../utils/CheckAuth")
const Render = require("../utils/CheckAuth")

Router.get("/", async (request, response) => {
    Render(response, request, "ch1llstudios/cshome.ejs");
})

module.exports = Router