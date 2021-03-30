const Express = require("express")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    await request.session.destroy()

    response.redirect(global.Bot.Config.website.failureURL)
})

module.exports = Router
