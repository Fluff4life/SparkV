const Express = require("express")
const CheckAuth = require("../CheckAuth")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/home", async (request, response) => {
    response.sendFile(`app/website/views/home.html`);
})

Router.get("/ch1llstudios", async (request, response) => {
    response.sendFile(__dirname + `app/website/views/cshome.html`);
})

Router.get("/ch1llblox", async (request, response) => {
    response.sendFile(__dirname + `app/website/views/ch1llblox.html`);
})

module.exports = Router
