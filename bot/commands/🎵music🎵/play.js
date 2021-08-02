const Discord = require('discord.js');

exports.run = async (bot, message, args, command, data) => {
  if (!message.member.voice.channel) {
    return message
      .reply(`${bot.config.bot.Emojis.error} | You must be in a __**voice channel**__ to use this command!`)
      .then(m => m.delete({ timeout: 5000 }));
  }

  args = args.join(' ');

  if (!args) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please enter a song URL or query to search!`);
  }

  try {
    bot.distube.play(message, args);
  } catch (err) {
    console.error(err);

    message.reply(`${bot.config.bot.Emojis.error} | Uh oh! An error occured.`);
  }
},

  exports.config = {
    name: 'Play',
    description: 'Plays a song with the given name or URL.',
    aliases: ['p'],
    usage: '<song title or URL>',
    category: '🎵music🎵',
    bot_permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
