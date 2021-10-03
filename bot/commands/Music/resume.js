const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .replyT(`${bot.config.Emojis.error} | You must be in a __**voice channel**__ to use this command!`);
  }

  let queue = await bot.distube.getQueue(message);

  if (!queue) {
    return await message.replyT(`${bot.config.Emojis.error} | No songs was ever/still is paused.`);
  }

  bot.distube.resume(message).then(async () => {
    await message.replyT({
      embed: {
        title: `${bot.config.Emojis.music} | Resumed`,
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
