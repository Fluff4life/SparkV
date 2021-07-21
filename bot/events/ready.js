const Discord = require("discord.js")
const botdash = require("botdash.pro")

exports.run = async (bot) => {
  const Activities = [
    {
      text: `${bot.config.bot.prefix}Help | ^Invite`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `${bot.FormatNumber(await bot.GetServerCount())} servers! | ^Invite`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `${bot.FormatNumber(await bot.GetUserCount())} users | ^Invite!`,
      type: "WATCHING",
      status: "online"
    }
  ]

  setInterval(async () => {
    const Activity = Activities[Math.floor(Math.random() * Activities.length)]

    bot.user.setPresence({
      status: Activity.status,

      activity: {
        name: Activity.text,
        type: Activity.type,
        url: Activity.url
      },
    })

    for (const guild of bot.guilds.cache) {
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
  }, 60 * 1000)

  bot.user.setPresence({
    status: "dnd",

    activity: {
      name: "Loading Ch1llBlox (100%)",
      type: "CUSTOM_STATUS"
    },
  })

  bot.dashboard = new botdash.APIclient(process.env.dashapikey)

  if (bot.StatClient){
    bot.StatClient.autopost()
  }

  bot.logger(`Logged into Discord as ${bot.user.tag} (${bot.user.id})\n🏢 | Servers: ${bot.FormatNumber(await bot.GetServerCount())}\n👥 | Users: ${bot.FormatNumber(await bot.GetUserCount())}`, "bot")
}
