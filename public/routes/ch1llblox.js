const Express = require("express")

const Dirname = require("../GetDirname")

const Router = Express.Router()

console.log(Dirname())

Router.get("/", async (request, response) => {
    response.sendFile(Dirname() + "/html/ch1llblox.html")
})

Router.use((req, res, next) => {
    res.status(404).sendFile(Dirname() + "/html/404.html");
});

module.exports = Router
