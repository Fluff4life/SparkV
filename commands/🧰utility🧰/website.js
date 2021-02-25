const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  msg.channel.send("Here's our website! https://ch1ll.herokuapp.com/Ch1llBlox")
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["web"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "Website",
    description: "I'll send my website!",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 2.5
  }
