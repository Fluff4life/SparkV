const Express = require("express")
const CheckAuth = require("../CheckAuth")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/home", async (request, response) => {
    response.sendFile(__dirname + `/public/html/home.html`);
})

Router.get("/ch1llstudios", async (request, response) => {
    response.sendFile(__dirname + `/public/html/cshome.html`);
})

Router.get("/ch1llblox", async (request, response) => {
    response.sendFile(__dirname + `/public/html/ch1llblox.html`);
})

module.exports = Router
