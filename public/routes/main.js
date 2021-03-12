const Express = require("express")

const CheckAuth = require("../auth/CheckAuth")
const Dirname = require("../GetDirname")

const Router = Express.Router()

console.log(Dirname())

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/donate", async (request, response) => {
    response.send({ message: "Coming soon!" })
})

Router.use((req, res, next) => {
    res.status(404).sendFile(Dirname() + "/html/404.html");
});

module.exports = Router
