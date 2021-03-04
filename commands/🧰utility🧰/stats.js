const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
  const BotMessage = await msg.channel.send("Fetching Stats. Please wait!")

  const StatsEmbed = new Discord.MessageEmbed()
    .setTitle("Stats")
    .addField("**LATENCY**", `\`\`\`Ch1llBlox: ${Bot.ws.ping}ms\nAPI: ${BotMessage.createdAt - msg.createdAt}ms\`\`\``, true)
    .addField("**STORAGE**", `\`\`\`RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
    .addField("**DATA**", `\`\`\`Uptime: ${Bot.MSToTime(Bot.uptime)}\`\`\``, true)
    .setFooter("Ch1llBlox's Stats")
    .setColor("#0099ff")
    .setTimestamp()

  BotMessage.edit(StatsEmbed)
},

  exports.config = {
    name: "Stats",
    description: "Stats for nerds.",
    aliases: ["ping", "pong", "up", "MU"],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }