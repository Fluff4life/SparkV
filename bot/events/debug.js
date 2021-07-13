const Discord = require("discord.js")

exports.run = async(Bot, info) => {
  if (Bot.Config.Debug.Enabled === true){
    Bot.logger(`Bot Debug - ${info}`, "bot")
  }
}
