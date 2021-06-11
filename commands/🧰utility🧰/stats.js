const Discord = require("discord.js");
const os = require("os")

exports.run = async (Bot, message) => {
  const BotMessage = await message.lineReplyNoMention("Fetching Stats...")
  let footerMessage = (`Ch1llBlox's Stats • ${Bot.Config.Bot.Embed.Footer}`)
  if (Bot.MSToTime(Bot.uptime) == "5 Minutes" {
      footerMessage = "pog you found me gj on timing it on exactly 5 minutes"
      }

  var UsedMemory = os.totalmem() - os.freemem()
  var TotalMemory = os.totalmem()
  var MemoryPersentage = ((UsedMemory / TotalMemory) * 100).toFixed(2) + "%"

  const StatsEmbed = new Discord.MessageEmbed()
    .setTitle("📊 Stats 📊")
    .addField("**LATENCY**", `\`\`\`Ch1llBlox: ${Bot.ws.ping}ms\nAPI: ${BotMessage.createdAt - message.createdAt}ms\`\`\``, true)
    .addField("**STORAGE**", `\`\`\`Memory: ${(UsedMemory / Math.pow(1024, 3)).toFixed(2)}/${(TotalMemory / Math.pow(1024, 3)).toFixed(2)} (${MemoryPersentage}) MB\nRAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
    .addField("**DATA**", `\`\`\`Uptime: ${Bot.MSToTime(Bot.uptime)}\nServers: ${Bot.FormatNumber(await Bot.GetServerCount())}\nUsers: ${Bot.FormatNumber(await Bot.GetUserCount())}\`\`\``, true)
    .setFooter(footerMessage)
    .setColor(Bot.Config.Bot.Embed.Color)
    .setTimestamp()

  BotMessage.edit("Loading complete!")
  BotMessage.edit(StatsEmbed)
},

  exports.config = {
    name: "Stats",
    description: "Stats for nerds.",
    aliases: ["ping", "pong", "up", "ram", "memory", "uptime", "latency", "data", "storage"],
    usage: "",
    category: "🧰utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
  }
