const Discord = require("discord.js")
const ButtonPages = require("discord-button-pages")

exports.run = async(Bot, button) => {
    ButtonPages.buttonInteractions(button, Bot.interaction);
}
