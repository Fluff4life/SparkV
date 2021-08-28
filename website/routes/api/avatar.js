const Discord = require("discord.js");
const Express = require("express");
const fetch = require("node-fetch");

const Router = Express.Router();

const CheckAuth = require("../../utils/CheckAuth");
const Render = require("../../utils/Render");

Router.get("/:id:avatar", async (request, response) => {
    if (!request.params.id) {
        return response
            .status(500)
            .send({ error: true, error_message: "Invalid user ID." });
    }

    if (!request.params.avatar) {
        return response
            .status(500)
            .send({ error: true, error_message: "Invalid avatar ID." });
    }

    let avatar = await fetch(
        `https://cdn.discordapp.com/avatars/${request.params.id}/${request.params.avatar}.png?size=1024`
    );
    avatar = await avatar.buffer();

    response
        .writeHead(200, { "Content-Type": "image/png" })
        .end(avatar, "binary");
});

module.exports = Router;
