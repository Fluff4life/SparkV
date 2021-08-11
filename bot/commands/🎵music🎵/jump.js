const Discord = require(`discord.js`);

exports.run = async (bot, message, args, command, data) => {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  if (!bot.distube.isPlaying(message)) {
    return message.reply(`${bot.config.bot.Emojis.error} | A song must be __**playing**__ to use this command!`);
  }

  bot.distube
    .jump(message, parseInt(args[0]))
    .then(() =>
      message.reply(`${bot.config.bot.Emojis.music} | Okay, I successfully jumped to song number ${args[0]} in queue!`)
    )
    .catch(() =>
      message.reply(`${bot.config.bot.Emojis.error} | Invalid song number!`).then(m => m.delete({ timeout: 5000 }))
    );
},

  exports.config = {
    name: `Jump`,
    description: `I will jump to a certain song in the queue.`,
    aliases: [`leap`],
    usage: `<number>`,
    category: `🎵Music🎵`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
