const Discord = require("discord.js");

exports.run = async (Bot, message) => {
  const BotMessage = await message.channel.send("Fetching Stats. Please wait!")

  const StatsEmbed = new Discord.MessageEmbed()
    .setTitle("Stats")
    .addField("**LATENCY**", `\`\`\`Ch1llBlox: ${Bot.ws.ping}ms\nAPI: ${BotMessage.createdAt - message.createdAt}ms\`\`\``, true)
    .addField("**STORAGE**", `\`\`\`RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
    .addField("**DATA**", `\`\`\`Uptime: ${Bot.MSToTime(Bot.uptime)}\`\`\``, true)
    .setFooter(`Ch1llBlox's Stats • ${Bot.Config.Embed.EmbedFooter}`)
    .setColor(Bot.Config.Embed.EmbedColor)
    .setTimestamp()

  BotMessage.edit(StatsEmbed)
},

exports.config = {
    name: "Stats",
    description: "Stats for nerds.",
    aliases: ["ping", "pong", "up", "ram", "uptime", "latency", "data", "storage"],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }