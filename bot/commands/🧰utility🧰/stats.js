const os = require("os");
const Discord = require("discord.js");

(exports.run = async (bot, message) => {
<<<<<<< HEAD
  const BotMessage = await message.reply("Fetching Stats...");
  let footerMessage = `Ch1llBlox's Stats • ${bot.config.bot.Embed.Footer}`;
=======
    const BotMessage = await message.reply("Fetching Stats...");
    let footerMessage = `Ch1llBlox's Stats • ${bot.config.bot.Embed.Footer}`;
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89

    if (bot.MSToTime(bot.uptime) === "5 Minutes") {
        footerMessage =
            "pog you found me lol great job on timing it on exactly 5 minutes";
    }

    var UsedMemory = os.totalmem() - os.freemem();
    var TotalMemory = os.totalmem();
    var MemoryPersentage = `${((UsedMemory / TotalMemory) * 100).toFixed(2)}%`;

    var LocalPing = new Date().getTime() - message.createdTimestamp;
    var APIPing = bot.ws.ping;

<<<<<<< HEAD
  const StatsEmbed = new Discord.MessageEmbed()
    .setTitle("📊 Stats 📊")
    .addField("**LATENCY**", `\`\`\`Ch1llBlox: ${LocalPing}ms\nAPI: ${APIPing}ms\`\`\``, true)
    .addField(
      "**STORAGE**",
      `\`\`\`Memory: ${(UsedMemory / Math.pow(1024, 3)).toFixed(2)}/${(TotalMemory / Math.pow(1024, 3)).toFixed(
        2,
      )} (${MemoryPersentage}) MB\nRAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(
        process.memoryUsage().heapTotal /
        1024 /
        1024
      ).toFixed(2)}MB\`\`\``,
      true,
    )
    .addField(
      "**DATA**",
      `\`\`\`Uptime: ${bot.MSToTime(bot.uptime)}\nServers: ${bot.FormatNumber(
        await bot.GetServerCount(),
      )}\nUsers: ${bot.FormatNumber(await bot.GetUserCount())}\`\`\``,
      true,
    )
    .setFooter(footerMessage)
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp();

  BotMessage.edit(StatsEmbed);
}),
  (exports.config = {
    name: "Stats",
    description: "Ch1llBlox's stats.",
    aliases: ["ping", "pong", "up", "ram", "memory", "uptime", "latency", "data", "storage"],
    usage: "",
    category: "🧰Utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5,
  });
=======
    const StatsEmbed = new Discord.MessageEmbed()
        .setTitle("📊 Stats 📊")
        .addField(
            "**LATENCY**",
            `\`\`\`Ch1llBlox: ${LocalPing}ms\nAPI: ${APIPing}ms\`\`\``,
            true
        )
        .addField(
            "**STORAGE**",
            `\`\`\`Memory: ${(UsedMemory / Math.pow(1024, 3)).toFixed(2)}/${(
                TotalMemory / Math.pow(1024, 3)
            ).toFixed(2)} (${MemoryPersentage}) MB\nRAM: ${(
                process.memoryUsage().heapUsed /
                1024 /
                1024
            ).toFixed(2)}/${(
                process.memoryUsage().heapTotal /
                1024 /
                1024
            ).toFixed(2)}MB\`\`\``,
            true
        )
        .addField(
            "**DATA**",
            `\`\`\`Uptime: ${bot.MSToTime(
                bot.uptime
            )}\nServers: ${bot.FormatNumber(
                await bot.GetServerCount()
            )}\nUsers: ${bot.FormatNumber(await bot.GetUserCount())}\`\`\``,
            true
        )
        .setFooter(footerMessage)
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();

    BotMessage.edit(StatsEmbed);
}),
    (exports.config = {
        name: "Stats",
        description: "Ch1llBlox's stats.",
        aliases: [
            "ping",
            "pong",
            "up",
            "ram",
            "memory",
            "uptime",
            "latency",
            "data",
            "storage",
        ],
        usage: "",
        category: "🧰Utility🧰",
        bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
        member_permissions: [],
        enabled: true,
        cooldown: 1.5,
    });
>>>>>>> 70609d4f007e7ef8d0bb40ceac5f221f0697eb89
