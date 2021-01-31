const Discord = require("discord.js")

exports.run = async(Bot) => {
  var TotalMembers = 0

  Bot.guilds.cache.forEach(guild => {
    TotalMembers = TotalMembers + guild.memberCount
  })

  Bot.user.setPresence({
    activity: {
      name: `${process.env.prefix}Help | ${TotalMembers} users!`,
      type: "WATCHING",
    },
    status: "online",
  }),

  console.log(`Versions: \nNode Version: ${process.version}\nDiscord Version: ${Discord.version}`)
  console.log(`${Bot.user.tag} is now ready to come online! \nThere are currently ${Bot.guilds.cache.size} servers with ${TotalMembers} members in them.`)
}