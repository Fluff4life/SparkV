const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const Channels = message.guild.channels.cache.filter(channel => channel.type !== "category")

  if (Arguments[0].toLowerCase() === "on"){
    Channels.forEach(Channel => {
      Channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false
      })
    })

    message.channel.send("🔒 Server is now locked. Users can no longer chat.")
  } else if (Arguments[0].toLowerCase() === "off"){
    Channels.forEach(Channel => {
      Channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true
      })
    })

    message.channel.send("🔒 Server is now unlocked. Users can now chat.")
  }
},
 
  exports.config = {
    name: "Lockdown",
    description: "I'll lock the server.",
    aliases: [],
    usage: "<on or off>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_CHANNELS"],
    member_permissions: ["MANAGE_CHANNELS"],
    enabled: true,
    cooldown: 5
  }