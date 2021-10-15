const Discord = require(`discord.js`);

const cmd = require("../../templates/musicCommand");

async function execute(bot, message, args, command, data) {
  if (!message.member.voice.channel) {
    return message
      .replyT(`${bot.config.emojis.error} | You must be in a __**voice channel**__ to use this command!`);
  }

  if (!bot.distube.isPlaying(message)) {
    return message
      .replyT(`${bot.config.emojis.error} | A song must be playing to use this command!`);
  }

  const Queue = bot.distube.getQueue(message);
  let mode;

  if (!bot.distube.isPlaying(message)) {
    return message
      .replyT(`${bot.config.emojis.error} | A song must be playing to use this command!`);
  }

  if (args[0].toLowerCase() === `song`) {
    mode = 1;
  } else if (args[0].toLowerCase() === `queue`) {
    if (!Queue) {
      return message
        .replyT(`${bot.config.emojis.error} | There must be more than 2 songs in the queue to use this command!`);
    }

    mode = 2;
  } else {
    mode = 0;
  }

  await message.replyT(`${bot.config.emojis.music} | Okay, I'll ${mode}.`);
}

module.exports = new cmd(execute, {
  description: `Replays the currently playing song.`,
  dirname: __dirname,
  usage: "<song or queue: leave empty to deactivate>",
  aliases: ["replay", "loop"],
  perms: ["EMBED_LINKS"],
});
