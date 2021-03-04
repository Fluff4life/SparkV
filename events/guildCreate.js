const Discord = require("discord.js")

exports.run = async(Bot, guild) => {
  for (const guild of Bot.guilds.cache) {
    if (process.env.GuildBlacklist.includes(guild.id)) {
      try {
        await guild.leave()

        console.log(`Left guild ${guild.name} because it's on the GuildBlacklist.`)
      } catch {
        console.log(`Failed to leave Blacklisted guild! GuildName: ${guild.name} GuildID: ${id}`)
      }
    }
  }

  for (const guild of Bot.guilds.cache) {
    if (process.env.UserBlacklist.includes(guild.ownerID)) {
      try {
        await guild.leave()

        console.log(`Left guild ${guild.name} because it's on the UserBlacklist.`)
      } catch {
        console.log(`Failed to leave Blacklisted User's Guild! GuildName: ${guild.name} GuildID: ${id}`)
      }
    }
  }

  if (guild.systemChannel && guild.systemChannel.permissionsFor(Bot.user).has("SEND_MESSAGES")){
    try {
      await guild.systemChannel.send("Hi! My name's Ch1llBlox. I'm a ch1ll bot with over 60+ commands and more are constantly being added! Simply use the command ^Help to get a list of my commands. See you around!")
    } catch {
      console.log(`Failed to send message to ${guild.name} (${guild.id})!`)
    }
  }

  console.log(`New guild added: ${guild.name} (Id: ${guild.id})`)
}
