const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
  (bot, message) => {
    message.reply(`${bot.config.bot.Emojis.success} | Here's my website! https://${process.env.BASEURL}/bot)`);
  },
  {
    description: "I'll send my website!",
    usage: "",
    aliases: ["web"],
    perms: ["EMBED_LINKS"],
  },
);
