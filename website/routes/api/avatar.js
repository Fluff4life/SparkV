const Express = require("express")
const Discord = require("discord.js")
const fetch = require("node-fetch")

const Router = Express.Router()

const CheckAuth = require("../utils/CheckAuth")
const Render = require("../utils/Render");

Router.get("/", async (request, response) => {
	let avatar = request.query.avatar
    let fetch = await fetch(avatar)
    fetch = await fetch.buffer()

    response.writeHead(200, { "Content-Type": "image/png" }).end(fetch, "binary")
})

module.exports = Router
