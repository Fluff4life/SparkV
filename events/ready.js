const Discord = require("discord.js")

exports.run = async (Bot) => {
  const Activities = [
    {
      text: `${process.env.prefix}Help`,
      type: "WATCHING",
      status: "online"
    },
  
    {
      text: `${await Bot.GetServerCount()} servers!`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `Watching ${await Bot.GetUserCount()} users!`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `Ch1ll'n!`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `😏https://ch1ll.herokuapp.com/Ch1llBlox/donate`,
      type: "WATCHING",
      status: "online"
    },
  ]

  Bot.setInterval(() => {
    const Activity = Activities[Math.floor(Math.random() * Activities.length)]

    Bot.user.setPresence({
      activity: {
        name: Activity.text,
        type: Activity.type
      },
      status: Activity.status
    })
  }, 60 * 1000)

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

  Bot.user.setAvatar(process.env.AvatarURL)
  Bot.Log("BOT STATUS", Bot.user.tag, `Bot is now up and running!\nServers: ${await Bot.GetServerCount()}\nUsers: ${await Bot.GetUserCount()}`)
}
