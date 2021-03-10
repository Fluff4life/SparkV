const Discord = require("discord.js")

exports.run = async (Bot, channel) => {
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

  const Logging = await Bot.Database.get(`ServerData_${channel.guild.id}.Logging.enabled`)
  const LoggingChannelID = await Bot.Database.get(`ServerData_${channel.guild.id}.Logging.channelID`)

  if (Logging && Logging === "on" && LoggingChannelID) {
    const LoggingChannel = Bot.channels.get(LoggingChannelID)

    if (LoggingChannel) {
      const LogEmbed = new Discord.MessageEmbed()
        .setTitle("🆕Channel Created")
        .setDescription(`#${channel.name} was just created.`)
        .setAuthor(channel.guild.iconURL())
        .setFooter(`Channel ID: ${channel.id}`, process.env.AvatarURL)
        .setColor("#00FF6D");

      LoggingChannel.send(LogEmbed)
    }
  }
}
