const Discord = require("discord.js")

exports.run = async(Bot, guild) => {
  if (!guild.available){
    return
  }

  var TotalMembers = 0

  console.log(`New guild removed: ${guild.name} (Id: ${guild.id})`)

  Bot.guilds.cache.forEach(guild => {
    TotalMembers = TotalMembers + guild.memberCount
  })

  Bot.user.setPresence({
    activity: {
      name: `${process.env.prefix}Help | ${TotalMembers} users!`,
      type: "WATCHING",
    },
    status: "online",
  })
}