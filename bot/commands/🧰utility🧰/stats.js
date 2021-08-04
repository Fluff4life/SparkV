const os = require("os");
const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const BotMessage = await message.reply("Fetching Stats...");
  let footerMessage = `Ch1llBlox's Stats • ${bot.config.bot.Embed.Footer}`;

  if (bot.MSToTime(bot.uptime) === "5 Minutes") {
    footerMessage = "pog you found me lol great job on timing it on exactly 5 minutes";
  }

  var UsedMemory = os.totalmem() - os.freemem();
  var TotalMemory = os.totalmem();
  var MemoryPersentage = `${((UsedMemory / TotalMemory) * 100).toFixed(2)}%`;

  var LocalPing = new Date().getTime() - message.createdTimestamp;
  var APIPing = bot.ws.ping;

  const StatsEmbed = new Discord.MessageEmbed()
    .setTitle("📊 Stats 📊")
    .addField("**LATENCY**", `\`\`\`Ch1llBlox: ${LocalPing}ms\nAPI: ${APIPing}ms\`\`\``, true)
    .addField("**STORAGE**", `\`\`\`Memory: ${(UsedMemory / Math.pow(1024, 3)).toFixed(2)}/${(TotalMemory / Math.pow(1024, 3)).toFixed(2)} (${MemoryPersentage}) MB\nRAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
    .addField("**DATA**", `\`\`\`Uptime: ${bot.MSToTime(bot.uptime)}\nServers: ${bot.FormatNumber(await bot.GetServerCount())}\nUsers: ${bot.FormatNumber(await bot.GetUserCount())}\`\`\``, true,)
    .setFooter(footerMessage)
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp();

  BotMessage.edit("Loading complete!");
  BotMessage.edit(StatsEmbed);
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
};
