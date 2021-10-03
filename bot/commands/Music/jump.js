const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!bot.distube.isPlaying(message)) {
    return await message.replyT(`${bot.config.Emojis.error} | A song must be __**playing**__ to use this command!`);
  }

  bot.distube
    .jump(message, parseInt(args[0]))
    .then(async () =>
      await message.replyT(`${bot.config.Emojis.music} | Okay, I successfully jumped to song number ${args[0]} in queue!`),
    )
    .catch(async () =>
      await message.replyT(`${bot.config.Emojis.error} | Invalid song number!`).then(m => m.delete({ timeout: 5000 })),
    );
}

module.exports = new cmd(execute, {
  description: `I will jump to a certain song in the queue.`,
  dirname: __dirname,
  usage: "<number>",
  aliases: ["leap"],
  perms: ["EMBED_LINKS"],
});
