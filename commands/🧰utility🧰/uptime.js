const Discord = require("discord.js");

(exports.run = async (Bot, msg) => {
    let BotMessage = await msg.reply("Getting uptime...");

    BotMessage.edit({
      embed: {
        title: "Uptime",
        description: [`**Uptime**: ${Bot.MSToTime(Bot.uptime)}`].join("\n"),
        color: "#0099ff",
        timestamp: new Date()
      }
    }).catch(() =>
      BotMessage.edit(
        "Unknown error occurred. Do I have permision to Embed Links?"
      )
    );
}),
  (exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["timeup", "ut"],
    mod_only: false
  }),
  (exports.help = {
    name: "Uptime",
    description: "I will return the ammount of time i've been running for!",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 5
  });