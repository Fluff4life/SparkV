const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 5000 }))
  }
  
  message.channel.setRateLimitPerUser(Arguments[0])
  message.channel.send("Slowmode is now " + Arguments[0] + " seconds.")
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["slow"],
    mod_only: false
  },
  
  exports.help = {
    name: "Slowmode",
    description: "I will set the channel's slowmode to anything you want.",
    usage: "<Slowmode number>",
    category: "🧰utility🧰",
    cooldown: 5
  }