const Express = require("express")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.redirect("/home")
})

Router.get("/socket.io", async (request, response) => {
    const EIO = request.query.EIO
    const transport = request.query.transport
    const t = request.query.t
    const b64 = request.query.b64

    // Todo later.
})

Router.get("/status", async (request, response) => {
    response.redirect("https://stats.uptimerobot.com/x84NBTJEkN")
})

/* Fix for wrong redirects */
Router.get("/dashboard", async (request, response) => {
    response.redirect("/bot/dashboard")
})

module.exports = Router