const Discord = require('discord.js');

exports.run = async (bot, message, args, command, data) => {
  args = args.join(' ');

  message.delete().catch(_ => {});

  message.reply(`${args}\n*-${message.author.username}*`);
};

  exports.config = {
    name: 'Say',
    description: 'I will say whatever you want me to say.',
    aliases: ['talk'],
    usage: '<message>',
    category: '😃fun😃',
    bot_permissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
