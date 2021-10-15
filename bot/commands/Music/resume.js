const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .replyT(`${bot.config.emojis.error} | You must be in a __**voice channel**__ to use this command!`);
  }

  let queue = await bot.distube.getQueue(message);

  if (!queue) {
    return await message.replyT(`${bot.config.emojis.error} | No songs was ever/still is paused.`);
  }

  bot.distube.resume(message).then(async () => {
    await message.replyT({
      embed: {
        title: `${bot.config.emojis.music} | Resumed`,
        description: `Resumed song`,
        color: `#0099ff`,
      },
    });
  });
}

module.exports = new cmd(execute, {
  description: `Resume playing the current song.`,
  dirname: __dirname,
  usage: "",
  aliases: ["unpause"],
  perms: ["EMBED_LINKS"],
});
