const Discord = require('discord.js');

const showerthoughts = ['showerthoughts'];

exports.run = async (bot, message) => {
  const random_showerthought = showerthoughts[Math.floor(Math.random() * showerthoughts.length)];

  const ShowerThoughtEmbed = new Discord.MessageEmbed()
    .setTitle("Here's a shower thought")
    .setFooter(
      `Shower Thought from r/${random_showerthought} • ${bot.config.bot.Embed.Footer}`,
      bot.user.displayAvatarURL()
    )
    .setURL(`https://reddit.com/r/${random_showerthought}`)
    .setColor(bot.config.bot.Embed.Color)
    .setTimestamp();

  await message.reply(ShowerThoughtEmbed);
};

exports.config = {
    name: 'ShowerThought',
    description: 'I will say whatever you want me to say.',
    aliases: ['thought'],
    usage: '',
    category: '😃fun😃',
    bot_permissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
    member_permissions: [],
    enabled: true,
    cooldown: 5
};
