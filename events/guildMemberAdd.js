const Discord = require("discord.js")

exports.run = async(Bot, member) => {
  if (!member.guild.available){
    return
  }

  const data = await Bot.Settings.findOne({
    Guild: `${Message.guild.name} (${Message.guild.id})`
  })
  
  if (data){
      if (data.Settings.WelcomeSettings.WelcomeEnabled){
          const Channel = member.guild.channels.cache.find(channel => channel.id === data.Settings.WelcomeChannelID)

          if (!Channel){
              return member.owner.send("Failed to find your welcome channel. Please reconfig!")
          }

        Channel.send(data.Settings.WelcomeMessage)
      }
}

  console.log(`New guild added: ${guild.name} (Id: ${guild.id})`)
  Bot.TotalMembers = Bot.TotalMembers - guild.memberCount
}