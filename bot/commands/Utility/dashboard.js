const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message) {
  message.reply(
    `${bot.config.Emojis.success} | Click the following link to view my dashboard! Link: https://SparkV.ch1ll.dev/dashboard`,
  );
}

module.exports = new cmd(execute, {
  description: `I'll send my dashboard!`,
  dirname: __dirname,
  aliases: ["dash"],
  usage: `<user>`,
});
