const Express = require("express")

const CheckAuth = require("../auth/CheckAuth")
const Dirname = require("../GetDirname")

const Router = Express.Router()

console.log(Dirname())

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/donate", async (request, response) => {
    response.sendFile("")
})

Router.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/html/404.html");
});

module.exports = Router
