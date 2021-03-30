const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("ch1llblox", {
        bot: {
            name: "Ch1llBlox",
            avatar: await global.Bot.user.displayAvatarURL()
        },
        
        user: response.user
    })
})

Router.get("/faq", async (request, response) => {
    response.render("faq")
})

module.exports = Router
