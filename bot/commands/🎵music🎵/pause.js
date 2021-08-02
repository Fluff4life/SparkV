const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  let queue = await bot.distube.getQueue(message);

  if (!queue) {
    return message.reply(
      `${bot.config.bot.Emojis.error} | There is nothing in the queue right now! Try playing some songs.`,
    );
  }

  if (queue.pause) {
    bot.distube.resume(message);

    return message.reply(`${bot.config.bot.Emojis.error} | I resumed the paused song for you!`);
  }

  bot.distube.pause(message);
  message.reply(`${bot.config.bot.Emojis.music} | I paused the song for you!`);
},

  exports.config = {
    name: `Pause`,
    description: `Pauses the current song playing.`,
    aliases: [`softstop`],
    usage: ``,
    category: `🎵music🎵`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
