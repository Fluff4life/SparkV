const Discord = require("discord.js")

exports.run = async(bot, info) => {
  if (bot.config.Debug.Enabled === true){
    bot.logger(`bot Debug - ${info}`, "bot")
  }
}
