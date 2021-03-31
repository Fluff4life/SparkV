const Discord = require("discord.js")

exports.run = async(Bot, info) => {
  if (Bot.Config.Debug === true){
    Bot.Log("DEBUG", "BOT DEBUG", info)
  }
}
