const Express = require("express")

const CheckAuth = require("../auth/CheckAuth")
const Dirname = require("../GetDirname")

const Router = Express.Router()

console.log(Dirname())

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/home", async (request, response) => {
    response.sendFile(Dirname() + "/html/home.html");
})

Router.get("/ch1llstudios", async (request, response) => {
    response.sendFile(Dirname() + "/html/cshome.html");
})

Router.get("/ch1llblox", async (request, response) => {
    response.sendFile(Dirname() + "/html/ch1llblox.html")
})

module.exports = Router
