const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const Channel = message.mentions.channels.filter(channel => channel.type === "text" && channel.guild.id === message.guild.id).first();

  if (!Channel){
    return message.channel.send("You cannot set slowmode in an announcements channel.")
  }

  if (isNaN(Arguments[0])){
    return message.channel.send("That's not a nunber.").then(m => m.delete({ timeout: 5000 }))
  }

  if (Arguments[0] > 21600){
    return message.channel.send("That's too high of a number! This is due to discord limiting slowmode up to 6 hours.")
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