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

  bot.distube
    .shuffle(message)
    .then(() => message.reply(`${bot.config.bot.Emojis.music} | Okay, I'll shuffle the queue.`))
    .catch(err => message.reply(`${bot.config.bot.Emojis.error} | Uh oh! An error occured.`));
},

  exports.config = {
    name: `Shuffle`,
    description: `Shuffles the queue. Requires administartor to prevent abuse.`,
    aliases: [],
    usage: ``,
    category: `🎵music🎵`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
    member_permissions: [`ADMINISTRATOR`],
    enabled: true,
    cooldown: 5
};
