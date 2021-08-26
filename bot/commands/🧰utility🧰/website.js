const Discord = require("discord.js");

exports.run = async (bot, message) => {
  message.reply(`${bot.config.bot.Emojis.success} | Here's my website! https://${process.env.BASEURL}/bot)`);
},

  exports.config = {
    name: "Website",
    description: "I'll send my website!",
    aliases: ["web"],
    usage: "",
    category: "🧰Utility🧰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 1.5
};
