const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!bot.distube.isPlaying(message)) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | A song must be playing to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (isNaN(args[0])) {
    return message.reply(`${bot.config.bot.Emojis.error} | That's not a valid number!`);
  }

  if (parseInt(args[0]) > 100) {
    return message
      .send(`${bot.config.bot.Emojis.error} | Due to performance reasons, songs cannot go louder than 100.`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  bot.distube
    .setVolume(message, parseInt(args[0]))
    .then(() => message.reply(`${bot.config.bot.Emojis.music} | I set the volume to ${args[0]}!`))
    .catch(err => message.reply(`${bot.config.bot.Emojis.error} | Uh oh! An error occured.`));
},

  exports.config = {
    name: `Volume`,
    description: `Sets the volume of the currently playing track.`,
    aliases: [`v`, `setvolume`],
    usage: ``,
    category: `🎵music🎵`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
