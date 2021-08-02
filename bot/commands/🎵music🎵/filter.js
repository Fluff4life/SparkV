const Discord = require('discord.js');

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

  const Queue = bot.distube.getQueue(message);

  if (args[0].toLowerCase() === 'off' && Queue.filter) {
    bot.distube
      .setFilter(message, Queue.filter)
      .then(() => message.reply(`${bot.config.bot.Emojis.error} | Okay, I turned off the filter.`));
  } else if (Object.keys(bot.distube.filters).includes(args[0])) {
    bot.distube
      .setFilter(message, args[0])
      .then(() => message.reply(`${bot.config.bot.Emojis.music} | Okay, I turned on filter ${args[0]}.`));
  } else {
    return message.reply(`${bot.config.bot.Emojis.error} | That's not a valid filter!`);
  }
},

  exports.config = {
    name: 'Filter',
    description:
      'Change what the song sounds like! Filters: 3d, bassboost, echo, karaoke, nightcore, vaporwave. Requires admin to prevent abuse.',
    aliases: ['setfilter'],
    usage: '<Filter>',
    category: '🎵music🎵',
    bot_permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
    member_permissions: ['ADMINISTRATOR'],
    enabled: true,
    cooldown: 5
};
