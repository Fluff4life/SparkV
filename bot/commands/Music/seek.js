const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .replyT(`${bot.config.Emojis.error} | You must be in a __**voice channel**__ to use this command!`);
  }

  if (!bot.distube.isPlaying(message)) {
    return message
      .replyT(`${bot.config.Emojis.error} | A song must be __**playing**__ to use this command!`);
  }

  bot.distube
    .seek(message, parseInt(args[0]))
    .then(async () => {
      await message.replyT(`${bot.config.Emojis.music} | Okay, I set the track's position to ${args[0]}.`);
    })
    .catch(async err => await message.replyT(`${bot.config.Emojis.error} | Uh oh! An error occured.`));
}

module.exports = new cmd(execute, {
  description: `Change the current track's position.`,
  dirname: __dirname,
  usage: "<number>",
  aliases: ["unpause"],
  perms: ["EMBED_LINKS"],
});
