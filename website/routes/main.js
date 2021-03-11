const Express = require("express")
const CheckAuth = require("../CheckAuth")
const Router = Express.Router()

Router.get("/", CheckAuth, async (request, response) => {
    response.redirect("/home")
})

Router.get("/home", CheckAuth, async (request, response) => {
    response.sendFile(__dirname + `/public/html/home.html`);
})

Router.get("/ch1llstudios", CheckAuth, async (request, response) => {
    response.sendFile(__dirname + `/public/html/cshome.html`);
})

Router.get("/ch1llblox", CheckAuth, async (request, response) => {
    response.sendFile(__dirname + `/public/html/ch1llblox.html`);
})

module.exports = Router
