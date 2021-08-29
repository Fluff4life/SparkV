const Discord = require("discord.js");

const cmd = require("../../templates/modCommand");

async function execute(bot, message, args, command, data) {
  try {
    message.guild.roles.cache.forEach(role => {
      message.channel.createOverwrite(role, {
        SEND_MESSAGES: true,
      });
    });
  } catch (err) {}

  message.reply(`${bot.config.bot.Emojis.success} | Channel is now unlocked.`);
}

module.exports = new cmd(execute, {
  description: "I'll unlock the current channel.",
  aliases: ["slow"],
  usage: `<user> <reason>`,
  perms: ["MANAGE_CHANNELS"],
});
