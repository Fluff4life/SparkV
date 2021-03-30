const Discord = require("discord.js")

exports.run = async(Bot, guild) => {
  if (!guild.available){
    return
  }

  console.log(`Guild removed: ${guild.name} (Id: ${guild.id})`)
}
