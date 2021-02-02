const Discord = require("discord.js")

exports.run = async(Bot, guild) => {
  if (!guild.available){
    return
  }

  console.log(`New guild removed: ${guild.name} (Id: ${guild.id})`)
  Bot.TotalMembers = Bot.TotalMembers - guild.memberCount
}
