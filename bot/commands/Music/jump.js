const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!bot.distube.isPlaying(message)) {
    return message.reply(`${bot.config.bot.Emojis.error} | A song must be __**playing**__ to use this command!`);
  }

  bot.distube
    .jump(message, parseInt(args[0]))
    .then(() =>
      message.reply(`${bot.config.bot.Emojis.music} | Okay, I successfully jumped to song number ${args[0]} in queue!`),
    )
    .catch(() =>
      message.reply(`${bot.config.bot.Emojis.error} | Invalid song number!`).then(m => m.delete({ timeout: 5000 })),
    );
}

module.exports = new cmd(execute, {
  description: `I will jump to a certain song in the queue.`,
  usage: "<number>",
  aliases: ["leap"],
  perms: ["EMBED_LINKS"],
});
