const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const BotMessage = await msg.channel.send("Fetching Stats. Please wait!")

  const StatsEmbed = new Discord.MessageEmbed()
    .setTitle("Stats")
    .addField("**API Latency**", `\`\`\`${BotMessage.createdAt - msg.createdAt}ms\`\`\``, true)
    .addField("**RAM Usage**", `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
    .addField("**Build Versions**", `\`\`\`Node.js: v${process.versions.node}\nDiscord.js: v${Discord.version}\`\`\``, true)
    .addField("**Uptime**", `\`\`\`${Bot.MSToTime(Bot.uptime)}\`\`\``, true)
    .setFooter("Ch1llBlox's Stats")
    .setColor("#0099ff")
    .setTimestamp()

  BotMessage.edit(StatsEmbed)
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
