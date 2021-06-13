const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  try {
    message.guild.roles.cache.forEach(role => {
      message.channel.createOverwrite(role, {
        SEND_MESSAGES: false
      })
    })
  } catch(err){}

  message.lineReplyNoMention("Channel is now locked.")
},
 
  exports.config = {
    name: "Lock",
    description: "I'll lock the current channel.",
    aliases: [],
    usage: "",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_CHANNELS"],
    member_permissions: ["MANAGE_CHANNELS"],
    enabled: true,
    cooldown: 5
  }