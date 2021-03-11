const Express = require("express")
const CheckAuth = require("../CheckAuth")
const Router = Express.Router()

Router.get("/api/status", CheckAuth, async (request, response) => {
    response.status(200).send({ status: 200, message: "OK" });
})

Router.get("/api/ch1llblox/status", CheckAuth, async (request, response) => {
    response.status(process.env.BotOnline).send({ status: process.env.BotOnline });
})

module.exports = Router
