const Discord = require("discord.js")

exports.run = async(Bot) => {
  Bot.user.setPresence({
    activity: {
      name: `for ${process.env.prefix}Help`,
      type: "WATCHING",
    },

    status: "online",
  }),
  
  Bot.guilds.cache.map((guild) => {
    Bot.TotalMembers + guild.memberCount
  })

  console.log(`Versions: \nNode Version: ${process.version}\nDiscord Version: ${Discord.version}\n${Bot.user.tag} is now ready to come online! \nThere are currently ${Bot.guilds.cache.size} servers with ${Bot.TotalMembers} members in them.`)
}
