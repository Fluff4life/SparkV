const Discord = require(`discord.js`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (!args) {
    return message.reply(`${bot.config.Emojis.error} | Bruh I cannot reverse no text lol.`);
  }

  message.reply(args.join(` `).split(``).reverse()
.join(""));
}

module.exports = new cmd(execute, {
  description: `I will reverse any text you give me lol.`,
  aliases: [],
  dirname: __dirname,
  usage: `<optional user>`,
});
