const Discord = require("discord.js")

exports.run = async (Bot) => {
  const Activities = [
    {
      text: `${process.env.prefix}Help`,
      type: "WATCHING",
    },
  
    {
      text: `${Bot.guilds.cache.size} servers!`,
      type: "WATCHING"
    },
  
    {
      text: `${process.env.website}`,
      type: "WATCHING"
    }
  ]

  Bot.setInterval(() => {
    const Activity = Activities[Math.floor(Math.random() * Activities.length)]

    Bot.user.setActivity({
      activity: {
        name: Activity.text,
        type: Activity.type
      }
    })
  }, 60 * 1000)

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

  for (const guild of Bot.guilds.cache) {
    console.log(parseInt(guild.memberCount))
    Bot.UserCount = Bot.UserCount + parseInt(guild.memberCount)
  }

  console.log(`${Bot.user.tag} is now ready to come online! \nThere are currently ${Bot.guilds.cache.size} servers with ${Bot.UserCount} members in them.`)
}
