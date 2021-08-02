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

  let Mode = bot.distube.toggleAutoplay(message);
  message
    .reply(`${bot.config.bot.Emojis.music} | Okay, I just set AutoPlay ${Mode ? 'On' : 'Off'}.`)
    .then(m => m.delete({ timeout: 5000 }));
},

  exports.config = {
    name: 'AutoPlay',
    description: 'Sets AutoPlay. Requires Administrator.',
    aliases: ['autoplay'],
    usage: '<Toggle>',
    category: '🎵music🎵',
    bot_permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
    member_permissions: ['ADMINISTRATOR'],
    enabled: true,
    cooldown: 5
};
