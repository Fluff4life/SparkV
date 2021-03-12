const Express = require("express")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    await request.session.destroy()

    response.redirect(process.env.failureURL)
})

module.exports = Router
