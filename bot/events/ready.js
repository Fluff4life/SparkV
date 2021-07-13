const Discord = require("discord.js")
const botdash = require("botdash.pro")

exports.run = async (Bot) => {
  const Activities = [
    {
      text: `${Bot.Config.Bot.prefix}Help | ^Invite`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `${Bot.FormatNumber(await Bot.GetServerCount())} servers! | ^Invite`,
      type: "WATCHING",
      status: "online"
    },

    {
      text: `${Bot.FormatNumber(await Bot.GetUserCount())} users | ^Invite!`,
      type: "WATCHING",
      status: "online"
    }
  ]

  setInterval(async () => {
    const Activity = Activities[Math.floor(Math.random() * Activities.length)]

    Bot.user.setPresence({
      status: Activity.status,

      activity: {
        name: Activity.text,
        type: Activity.type,
        url: Activity.url
      },
    })

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
  }, 60 * 1000)

  Bot.user.setPresence({
    status: "dnd",

    activity: {
      name: "Loading Ch1llBlox (100%)",
      type: "CUSTOM_STATUS"
    },
  })

  Bot.dashboard = new botdash.APIclient(process.env.dashapikey)

  if (Bot.StatClient){
    Bot.StatClient.autopost()
  }

  Bot.logger(`Logged into Discord as ${Bot.user.tag} (${Bot.user.id})\n🏢 | Servers: ${Bot.FormatNumber(await Bot.GetServerCount())}\n👥 | Users: ${Bot.FormatNumber(await Bot.GetUserCount())}`, "bot")
}
