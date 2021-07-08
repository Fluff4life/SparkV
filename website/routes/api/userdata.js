const Express = require("express")

const Router = Express.Router()

const CheckAuth = require("../../utils/CheckAuth")
const Render = require("../../utils/Render");

Router.get("/", CheckAuth, async (request, response, next) => response.send(Object.entries(request.user)))

module.exports = Router