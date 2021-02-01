const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const BotMessage = await msg.channel.send("Ping!")
    
  msg.channel.send({
    embed: {
      title: "Pong!",
      description: `**Responce Time**: ${BotMessage.createdAt - msg.createdAt}ms\n**Up-Time**: ${Bot.MSToTime(Bot.uptime)}\n**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n**Users**: ${Bot.users.cache.size.toLocaleString()} - This can be wrong at times!\n**Servers**: ${Bot.guilds.cache.size.toLocaleString()}`,
      color: "#0099ff"
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
