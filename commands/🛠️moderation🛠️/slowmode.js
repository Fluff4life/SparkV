const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (isNaN(Arguments[0]) || parseInt(Arguments[0]) <= 0){
    return msg.channel.send("That's not a nunber.").then(m => m.delete({ timeout: 5000 }))
  }

  message.channel.setRateLimitPerUser(Arguments[0])
  message.channel.send("Slowmode is now " + Arguments[0] + " seconds.")
},
 
  exports.config = {
    name: "Slowmode",
    description: "I will set the channel's slowmode to anything you want.",
    aliases: ["slow"],
    usage: "<ammount>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "MANAGE_CHANNELS"],
    member_permissions: ["MANAGE_MESSAGES"],
    enabled: true,
    cooldown: 5
  }