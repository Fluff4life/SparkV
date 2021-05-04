const Express = require("express")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    global.RenderTemplate(response, request, "home/home.ejs");
})

module.exports = Router