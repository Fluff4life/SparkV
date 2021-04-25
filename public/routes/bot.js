const Express = require("express")

const Router = Express.Router()

Router.get("/", async (request, response) => {
    response.render("ch1llblox", {
        bot: {
            name: "Ch1llBlox",
            avatar: await global.Bot.user.displayAvatarURL() || "https://cdn.icon-icons.com/icons2/1476/PNG/512/discord_101785.png"
        },
        
        user: request.session.user || null
    })
})

Router.get("/faq", async (request, response) => {
    response.render("faq")
})

module.exports = Router
