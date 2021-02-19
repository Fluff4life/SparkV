const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const BotMessage = await msg.channel.send("Fetching Stats...")
  
  msg.channel.send({
    context: "Stats Complete!",

    embed: {
      title: "Stats",
      description: `**Response Time**: ${BotMessage.createdAt - msg.createdAt}ms\n**Up Time**: ${Bot.MSToTime(Bot.uptime)}\n**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n**Users**: ${Bot.UserCount}\n**Servers**: ${Bot.guilds.cache.size.toLocaleString()}`,
      color: "#0099ff"
    },
  })
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["ping", "pong", "up", "MU"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "Stats",
    description: "I will display my stats.",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 2.5
  }
