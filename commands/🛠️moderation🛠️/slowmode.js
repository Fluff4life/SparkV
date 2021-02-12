const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES") && (!message.member.hasPermission("MANAGE_CHANNELS"))){
    return message.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  message.channel.setRateLimitPerUser(Arguments[0])
  message.channel.send("Slowmode is now " + Arguments[0] + " seconds.")
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["slow"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
  },
  
  exports.help = {
    name: "Slowmode",
    description: "I will set the channel's slowmode to anything you want.",
    usage: "<Slowmode number>",
    category: "🛠️moderation🛠️",
    cooldown: 5
  }