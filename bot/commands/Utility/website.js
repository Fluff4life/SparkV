const Discord = require("discord.js");

const cmd = require("../../templates/command");

module.exports = new cmd(
  (bot, message) => {
    message.reply(`${bot.config.Emojis.success} | Here's my website! https://${process.env.BASEURL}/bot)`);
  },
  {
    description: "I'll send my website!",
    dirname: __dirname,
    usage: "",
    aliases: ["web"],
    perms: ["EMBED_LINKS"],
  },
);
