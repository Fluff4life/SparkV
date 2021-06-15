const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../../utils/CheckAuth")
const Render = require("../../utils/Render");

Router.get("/", async (request, response, next) => response.redirect("/api/auth/callback"))

module.exports = Router
