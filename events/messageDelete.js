const Discord = require("discord.js")

exports.run = async (Bot, message) => {
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

  if(!message.partial) {
    const channel = client.channels.cache.get('ID HERE');
    if(channel) {
        const embed = new MessageEmbed()
            .setTitle('Deleted Message')
            .addField('Author', `${message.author.tag} (${message.author.id})`, true)
            .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
            .setDescription(message.content)
            .setTimestamp();
        channel.send(embed);
    }
}

  const Logging = await Bot.Database.get(`ServerData_${Message.guild.id}.Logging.enabled`)
  const LoggingChannelID = await Bot.Database.get(`ServerData_${Message.guild.id}.Logging.channelID`)

  if (Logging && Logging === "on" && LoggingChannelID) {
    const LoggingChannel = Bot.channels.get(LoggingChannelID)

    if (LoggingChannel) {
      if (!message.partial){
        const LogEmbed = new Discord.MessageEmbed()
        .setTitle("❌Message Removed")
        .setDescription(`#${channel.name} was deleted.`)
        .setAuthor(message.channel.guild.iconURL())
        .setFooter(`Channel ID: ${channel.id}`, process.env.AvatarURL)
        .setColor("#00FF6D");

      LoggingChannel.send(LogEmbed)
      }
    }
  }
}
