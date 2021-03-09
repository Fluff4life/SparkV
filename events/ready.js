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
      text: `${await Bot.GetUserCount()} users!`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `${await Bot.GetUserCount()} cool kids 😎!`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `Ch1ll'n!`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `😏ch1ll.herokuapp.com/ch1llblox/donate`,
      type: "WATCHING",
      status: "online"
    },
  ]

  Bot.setInterval(() => {
    const Activity = Activities[Math.floor(Math.random() * Activities.length)]

    Bot.user.setPresence({
      status: Activity.status,

      activity: {
        name: Activity.text,
        type: Activity.type,
        url: Activity.url
      },
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
