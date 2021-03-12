const Express = require("express")
const Router = Express.Router()

Router.get("/", async (request, response) => {
    await request.session.destroy()

    response.redirect(process.env.failureURL)
})

Router.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/html/404.html");
});

module.exports = Router
