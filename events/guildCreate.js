const Discord = require("discord.js")

exports.run = async(Bot, guild) => {
  var TotalMembers = 0
  console.log(`New guild added: ${guild.name} (Id: ${guild.id})`)

  Bot.guilds.cache.forEach(guild => {
    TotalMembers = TotalMembers + guild.memberCount
  })

  Bot.user.setPresence({
    activity: {
      name: `with ${TotalMembers} users!`,
      type: "PLAYING",
    },

    status: "online",
  })
}