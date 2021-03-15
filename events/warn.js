const Discord = require("discord.js")

exports.run = async (Bot, event) => {
  for (const guild of Bot.guilds.cache) {
    if (process.env.UserBlacklist.includes(guild.ownerID)) {
      try {
        await guild.leave()

        console.log(`Left guild ${guild.name} because it's on the UserBlacklist.`)
      } catch {
        console.log(`Failed to leave Blacklisted User's Guild! GuildName: ${guild.name} GuildID: ${id}`)
      }
    }

    if (process.env.GuildBlacklist.includes(guild.id)) {
      try {
        await guild.leave()

        console.log(`Left guild ${guild.name} because it's on the GuildBlacklist.`)
      } catch {
        console.log(`Failed to leave Blacklisted guild! GuildName: ${guild.name} GuildID: ${id}`)
      }
    }
  }

  Bot.Log("WARNING", "BOT WARNING", event)
}
