const Discord = require("discord.js")
const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../utils/CheckAuth")
const Render = require("../utils/Render")

Router.get("/", async (request, response) => Render(response, request, "bot.ejs"))
Router.get("/donate", async (request, response) => Render(response, request, "ch1llblox/donate.ejs"))
Router.get("/dashboard", CheckAuth, async (request, response) => response.redirect("https://ch1llblox.botdash.pro/"))

module.exports = Router