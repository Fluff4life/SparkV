const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const BotMessage = await msg.channel.send("Ping!")
    
  msg.channel.send({
    embed: {
      title: "Pong!",
      description: `**Responce time:** ${BotMessage.createdAt - msg.createdAt}ms\n**Uptime**: ${Bot.MSToTime(Bot.uptime)}`,
      color: "#0099ff",
    },
  })
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["ping", "pong", "up"],
    mod_only: false
  },
  
  exports.help = {
    name: "Ping",
    description: "I will return my responce time in ms and how long I've been running for.",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 2.5
  }