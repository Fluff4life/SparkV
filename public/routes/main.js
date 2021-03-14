const Express = require("express")

const CheckAuth = require("../auth/CheckAuth")
const Dirname = require("../GetDirname")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/donate", async (request, response) => {
    response.send({ message: "Coming soon!" })
})

module.exports = Router
